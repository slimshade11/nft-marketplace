import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { ActivatedRoute, Data } from '@angular/router';
import { filter, map, Observable, takeUntil } from 'rxjs';
import { Component, NgZone, OnInit } from '@angular/core';
import { NFT } from '@home/models/nft.model';
import { ProfileFacade } from '@profile/profile.facade';
import { providers } from 'ethers';

@Component({
  selector: 'nftm-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent extends DestroyComponent implements OnInit {
  public nftList$!: Observable<NFT[]>;
  public account!: string;

  constructor(private activatedRoute: ActivatedRoute, private profileFacade: ProfileFacade, private ngZone: NgZone) {
    super();
  }

  ngOnInit(): void {
    this.nftList$ = this.activatedRoute.data.pipe(map(({ nftList }: Data): NFT[] => nftList));
    this.profileFacade
      .selectProvider$()
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe({
        next: (provider: providers.Web3Provider): Promise<void> => this.setAccount(provider),
      });
  }

  async setAccount(provider: providers.Web3Provider): Promise<void> {
    provider.listAccounts();
    const accounts = await provider?.listAccounts();
    this.account = accounts[0];
  }
}

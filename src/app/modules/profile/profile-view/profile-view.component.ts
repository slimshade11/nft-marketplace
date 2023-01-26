import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NFT } from '@home/models/nft.model';

@Component({
  selector: 'nftm-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
  public nftList$: Observable<NFT[]> = this.getNftList$();

  constructor(private activatedRoute: ActivatedRoute) {}

  private getNftList$(): Observable<NFT[]> {
    return this.activatedRoute.data.pipe(map(({ nftList }: Data): NFT[] => nftList));
  }
}

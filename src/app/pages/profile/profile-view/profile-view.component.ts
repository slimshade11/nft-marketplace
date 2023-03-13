import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NFTMeta } from '@common/web3/models/nft-meta.model';

@Component({
  selector: 'nft-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {
  public nftList$: Observable<NFTMeta[]> = this.getNftList$();

  constructor(private activatedRoute: ActivatedRoute) {}

  private getNftList$(): Observable<NFTMeta[]> {
    return this.activatedRoute.data.pipe(map(({ nftList }: Data): NFTMeta[] => nftList));
  }
}

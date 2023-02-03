import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NFT } from '@home/models/nft.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'nft-nft-list',
  template: `
    <div class="mt-12 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
      <div
        *ngFor="let nft of nftList$ | async as nftList"
        class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <nft-nft-item [nft]="nft"></nft-nft-item>
      </div>
    </div>
  `,
})
export class NftListComponent {
  public nftList$: Observable<NFT[]> = this.activatedRoute.data.pipe(map(({ nftList }: Data): NFT[] => nftList));

  constructor(private activatedRoute: ActivatedRoute) {}
}

import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NFT } from '@home/models/nft.model';
import { ActivatedRoute, Data } from '@angular/router';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';

@Component({
  selector: 'nftm-nft-list',
  template: `
    <div class="mt-12 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
      <div
        *ngFor="let nft of nftList$ | async as nftList"
        class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <nftm-nft-item [nft]="nft"></nftm-nft-item>
      </div>
    </div>
  `,
})
export class NftListComponent extends DestroyComponent implements OnInit {
  public nftList$!: Observable<NFT[]>;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.nftList$ = this.activatedRoute.data.pipe(map(({ nftList }: Data): NFT[] => nftList));
  }
}

import { HomeFacade } from '@home/home.facade';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { filter, Observable, take, tap } from 'rxjs';
import { NFT } from '@home/models/nft.model';

@Injectable()
export class NftListResolver implements Resolve<NFT[]> {
  constructor(private homeFacade: HomeFacade) {}

  resolve(): Observable<NFT[]> {
    return this.homeFacade.selectNftList$().pipe(
      tap((nftList: NFT[] | null): false | void => !nftList && this.homeFacade.dispatchGetNftListAction()),
      filter(Boolean),
      take(1)
    );
  }
}

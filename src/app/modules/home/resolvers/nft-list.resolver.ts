import { HomeFacade } from '@home/home.facade';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { filter, Observable, of, take, tap } from 'rxjs';
import { NFT } from '@home/models/nft.model';

@Injectable()
export class NftListResolver implements Resolve<NFT[]> {
  constructor(private readonly homeFacade: HomeFacade) {}

  resolve(): Observable<any> {
    return this.homeFacade.getNftList$().pipe(
      tap((nftList: NFT[] | null): false | void => !nftList && this.homeFacade.dispatchGetNftListAction()),
      filter(Boolean),
      take(1)
    );
  }
}

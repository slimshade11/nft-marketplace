import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { debounceTime, filter, Observable, take, tap } from 'rxjs';
import { NFT } from '@home/models/nft.model';
import { Store } from '@ngrx/store';
import { HomeActions, HomeSelectors } from '@store/home';

@Injectable()
export class NftListResolver implements Resolve<NFT[]> {
  constructor(private store: Store) {}

  public resolve(): Observable<NFT[]> {
    return this.store.select(HomeSelectors.nftList).pipe(
      debounceTime(500),
      tap((nftList: NFT[] | null): false | void => !nftList && this.store.dispatch(HomeActions.getNftList())),
      filter(Boolean),
      take(1)
    );
  }
}

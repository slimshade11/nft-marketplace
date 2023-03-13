import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { debounceTime, filter, Observable, take, tap } from 'rxjs';
import { NFTMeta } from '@common/web3/models/nft-meta.model';
import { Store } from '@ngrx/store';
import { HomeActions, HomeSelectors } from '@store/home';

@Injectable({ providedIn: 'root' })
export class NftListResolver implements Resolve<NFTMeta[]> {
  constructor(private store: Store) {}

  public resolve(): Observable<NFTMeta[]> {
    return this.store.select(HomeSelectors.nftList).pipe(
      debounceTime(500),
      tap((nftList: NFTMeta[] | null): void => {
        !nftList && this.store.dispatch(HomeActions.getNftList());
      }),
      filter(Boolean),
      take(1)
    );
  }
}

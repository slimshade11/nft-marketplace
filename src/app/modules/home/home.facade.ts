import { HomeService } from './services/home.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { HomeActions, HomeSelectors } from '@app/store/home';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { NFT } from '@home/models/nft.model';

@Injectable()
export class HomeFacade {
  constructor(private homeService: HomeService, private actions$: Actions, private store: Store) {}

  // NgRx Action Dispatchers //
  dispatchGetNftListAction(): void {
    this.store.dispatch(HomeActions.getNftList());
  }
  // NgRx Action Dispatchers end //

  // NgRx Selectors //
  getNftList$(): Observable<NFT[] | null> {
    return this.store.select(HomeSelectors.nftList);
  }
  // NgRx Selectors end //

  // NgRx Effects //
  public getNftListEffect$() {
    return this.actions$.pipe(
      ofType(HomeActions.getNftList),
      switchMap(() => {
        return this.homeService.getNftList$().pipe(
          map((nftList) => {
            return HomeActions.getNftListSuccess({ nftList });
          }),
          catchError((err) => {
            return of(HomeActions.getNftListFailure);
          })
        );
      })
    );
  }
  // NgRx Effects end //
}

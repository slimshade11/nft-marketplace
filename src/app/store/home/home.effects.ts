import { Injectable } from '@angular/core';
import { NFTMeta } from '@common/web3/models/nft-meta.model';
import { HomeService } from '@home/services/home.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { HomeActions } from '.';

@Injectable()
export class HomeEffects {
  getNftList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeActions.getNftList),
      switchMap(() => {
        return this.homeService.getNftList$().pipe(
          map((nftList: NFTMeta[]) => {
            return HomeActions.getNftListSuccess({ nftList });
          }),
          catchError(() => {
            return of(HomeActions.getNftListFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private homeService: HomeService) {}
}

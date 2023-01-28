import { Injectable } from '@angular/core';
import { NFT } from '@home/models/nft.model';
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
          map((nftList: NFT[]) => {
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

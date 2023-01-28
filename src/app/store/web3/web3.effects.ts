import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Web3Actions } from '.';
import { Web3Service } from '@common/web3/services/web3.service';
import { State as Web3State } from '@store/web3';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { ErrorFetchWeb3Data } from '@common/web3/toast-messages/error-fetch-web3-data';

@Injectable()
export class Web3Effects {
  createDefaultStateEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.createDefaultState),
      switchMap(() =>
        this.web3Service.createDefaultWeb3State$().pipe(
          map((web3State: Web3State) => {
            return Web3Actions.createDefaultStateSuccess({ web3State: Object.freeze(web3State) });
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, ErrorFetchWeb3Data.severity, ErrorFetchWeb3Data.details);
            return of(Web3Actions.createDefaultStateFailure());
          })
        )
      )
    );
  });

  accountChangedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.accountChanged),
      switchMap(({ address }) => {
        return of(address).pipe(
          map((address: string) => {
            return Web3Actions.accountChangedSuccess({ address: Object.freeze(address) });
          }),
          catchError(() => of(Web3Actions.accountChangedFailure()))
        );
      })
    );
  });

  constructor(private actions$: Actions, private web3Service: Web3Service, private toastService: ToastService) {}
}

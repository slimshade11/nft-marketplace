import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Web3Actions } from '.';
import { Web3Service } from '@common/web3/services/web3.service';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { GetMetamaskStateError } from '@common/web3/toast-messages/get-metamask-state-error';
import { NftMarket } from '@common/constants/market-contract-name';
import { GetMetamaskStatePayload } from '@common/web3/models/get-metamask-state-payload.model';

@Injectable()
export class Web3Effects {
  getMetamaskStateEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.getMetamaskState),
      switchMap(() => {
        return this.web3Service.getMetamaskState$().pipe(
          map((metamaskStatePayload: GetMetamaskStatePayload) => {
            return Web3Actions.getMetamaskStateSuccess({ metamaskStatePayload });
          }),
          catchError(() => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              GetMetamaskStateError.severity,
              GetMetamaskStateError.details
            );
            return of(Web3Actions.getMetamaskStateFailure());
          })
        );
      })
    );
  });

  loadContractEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(Web3Actions.loadContract),
        tap((): void => {
          this.web3Service.loadContract$(NftMarket).pipe(take(1)).subscribe();
        })
      );
    },
    { dispatch: false }
  );

  accountChangedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.accountChanged),
      switchMap(({ address }) => {
        return of(address).pipe(
          map((address: string | null) => {
            return Web3Actions.accountChangedSuccess({ address });
          }),
          catchError(() => {
            return of(Web3Actions.accountChangedFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private web3Service: Web3Service, private toastService: ToastService) {}
}

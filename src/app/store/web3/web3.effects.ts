import { GetChainIdPayload } from '@common/web3/models/get-chain-id-payload.model';
import { Web3Actions } from '@store/web3';
import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap, take, tap } from 'rxjs';
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
            this.toastService.showMessage(ToastStatus.ERROR, GetMetamaskStateError.severity, GetMetamaskStateError.details);
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

  getChainIdEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.getChainData),
      switchMap(() => {
        return from(this.web3Service.getChainId()).pipe(
          map((getChainIdPayload: GetChainIdPayload) => {
            return Web3Actions.getChainDataSuccess({ getChainIdPayload });
          }),
          catchError(() => {
            return of(Web3Actions.getChainDataFailure());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private web3Service: Web3Service, private toastService: ToastService) {}
}

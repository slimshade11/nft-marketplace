import { ToastService } from '@common/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { Web3Actions } from '.';
import { Web3Service } from '@common/web3/services/web3.service';
import { ToastStatus } from '@common/enums/toast-status.enum';
import { GetMetamaskStateError } from '@common/web3/toast-messages/get-metamask-state-error';
import { NftMarket } from '@common/constants/market-contract-name';
import { Contract } from 'ethers';
import { GetMetamaskStatePaylaod } from '@common/web3/models/get-metamask-state-payload.model';
import { LoadContractError } from '@common/web3/toast-messages/load-contract-error';

@Injectable()
export class Web3Effects {
  createDefaultStateEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.getMetamaskState),
      switchMap(() => {
        return this.web3Service.getMetamaskState$().pipe(
          map((metamaskStatePayload: GetMetamaskStatePaylaod) => {
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

  loadContractEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Web3Actions.loadContract),
      take(1),
      switchMap(() => {
        return this.web3Service.loadContract$(NftMarket).pipe(
          map((contract: Readonly<Contract>) => {
            return Web3Actions.loadContractSuccess({ contract });
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, LoadContractError.severity, LoadContractError.details);
            return of(Web3Actions.loadContractFailure());
          })
        );
      })
    );
  });

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

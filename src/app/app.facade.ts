import { ErrorFetchWeb3Data } from '@common_web3/toast-messages/error-fetch-web3-data';
import { ToastStatus } from '@common_enums/toast-status.enum';
import { Injectable } from '@angular/core';
import { Web3Service } from '@common_web3/services/web3.service';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Web3Actions, Web3Selectors } from '@store/web3';
import { map, switchMap, catchError, of, Observable, tap, take } from 'rxjs';
import { State as Web3State } from '@store/web3';
import { Contract } from 'ethers';
import { PrimeNGConfig } from 'primeng/api';
import { ToastService } from '@common_services/toast.service';

@Injectable()
export class AppFacade {
  constructor(
    private web3Service: Web3Service,
    private actions$: Actions,
    private store: Store,
    private primengConfig: PrimeNGConfig,
    private toastService: ToastService
  ) {}

  public handleAccountsChanged(): Observable<string> {
    return this.web3Service.handleAccountChanged$().pipe(
      map((address: string[]): string => address[0]),
      tap((address: string): void => {
        this.store.dispatch(Web3Actions.accountChanged({ address: Object.freeze(address) }));
      })
    );
  }

  public initPrimengConfig(): void {
    this.primengConfig.ripple = true;
  }

  // NgRx action dispatchers //
  public dispatchGetDefaultWeb3StateAction(): void {
    this.store.dispatch(Web3Actions.createDefaultState());
  }
  // NgRx action dispatchers end //

  // Ngrx selectors //
  public selectContract$(): Observable<Contract | null> {
    return this.store.select(Web3Selectors.contract);
  }

  public selectConnectedAddress$(): Observable<string> {
    return this.store.select(Web3Selectors.address);
  }

  public selectIsMetamaskInstalled$(): Observable<boolean> {
    return this.store.select(Web3Selectors.isMetamaskInstalled);
  }
  // Ngrx selectors end //

  // NgRx effects //
  public createDefaultStateEffect$() {
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
  }

  public accountChangedEffect$() {
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
  }
  // NgRx effects end //
}

import { Injectable } from '@angular/core';
import { Web3Service } from '@common_web3/services/web3.service';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Web3Actions, Web3Selectors } from '@store/web3';
import { map, switchMap, catchError, of, Observable, tap } from 'rxjs';
import { State as Web3State } from '@store/web3';
import { Contract, providers } from 'ethers';
import { PrimeNGConfig } from 'primeng/api';

@Injectable()
export class AppFacade {
  constructor(
    private web3Service: Web3Service,
    private actions$: Actions,
    private store: Store,
    private primengConfig: PrimeNGConfig
  ) {}

  public initPrimengConfig(): void {
    this.primengConfig.ripple = true;
  }

  // NgRx action dispatchers //
  public dispatchGetDefaultWeb3StateAction(): void {
    this.store.dispatch(Web3Actions.createDefaultState());
  }
  // NgRx action dispatchers end //

  // Ngrx selectors //
  public selectEthereum$(): Observable<MetaMaskInpageProvider | null> {
    return this.store.select(Web3Selectors.ethereum);
  }

  public selectProvider$(): Observable<providers.Web3Provider | null> {
    return this.store.select(Web3Selectors.provider);
  }

  public selectContract$(): Observable<Contract | null> {
    return this.store.select(Web3Selectors.contract);
  }
  // Ngrx selectors end //

  // NgRx effects //
  public createDefaultStateEffect$() {
    return this.actions$.pipe(
      ofType(Web3Actions.createDefaultState),
      switchMap(() =>
        this.web3Service.createDefaultWeb3State$().pipe(
          map((web3State: Web3State) => {
            console.log(JSON.parse(JSON.stringify(web3State)));
            return Web3Actions.createDefaultStateSuccess({ web3State });
          }),
          catchError(() => {
            // toast notifications here //
            return of(Web3Actions.createDefaultStateFailure());
          })
        )
      )
    );
  }
  // NgRx effects end //
}

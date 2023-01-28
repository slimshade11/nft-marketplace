import { Injectable } from '@angular/core';
import { Web3Service } from '@common/web3/services/web3.service';
import { Store } from '@ngrx/store';
import { Web3Actions, Web3Selectors } from '@store/web3';
import { map, Observable, take, tap } from 'rxjs';
import { Contract } from 'ethers';
import { PrimeNGConfig } from 'primeng/api';

@Injectable()
export class AppFacade {
  constructor(private web3Service: Web3Service, private store: Store, private primengConfig: PrimeNGConfig) {}

  public selectContract$(): Observable<Contract | null> {
    return this.store.select(Web3Selectors.contract);
  }

  public selectConnectedAddress$(): Observable<string> {
    return this.store.select(Web3Selectors.address);
  }

  public selectIsMetamaskInstalled$(): Observable<boolean> {
    return this.store.select(Web3Selectors.isMetamaskInstalled);
  }

  public handleAccountsChanged$(): Observable<string> {
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

  public dispatchGetDefaultWeb3StateAction(): void {
    this.store.dispatch(Web3Actions.createDefaultState());
  }
}

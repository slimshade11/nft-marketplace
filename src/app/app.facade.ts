import { Injectable } from '@angular/core';
import { Web3Service } from '@common/web3/services/web3.service';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Web3Actions } from './store/web3';

@Injectable()
export class AppFacade {
  constructor(private web3Service: Web3Service, private store: Store) {}

  public onAccountsChanged$(): Observable<string> {
    return this.web3Service.onAccountChanged$().pipe(
      tap((address: string): void => {
        this.store.dispatch(Web3Actions.accountChanged({ address: Object.freeze(address) }));
      })
    );
  }
}

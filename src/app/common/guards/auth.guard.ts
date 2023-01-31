import { Web3Selectors } from '@store/web3';
import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { State as Web3State } from '@app/store/web3';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Address } from '@common/web3/models/address.model';

@Injectable()
export class AuthGuard implements CanMatch {
  constructor(private store: Store<Web3State>, private router: Router) {}

  canMatch(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(Web3Selectors.address).pipe(
      map((address: Address): boolean => !!address),
      tap((isConnected: boolean): void => {
        !isConnected && this.router.navigateByUrl('/');
      })
    );
  }
}

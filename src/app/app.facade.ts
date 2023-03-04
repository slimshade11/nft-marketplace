import { Web3Actions, Web3Selectors } from '@store/web3';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Service } from '@common/web3/services/web3.service';
import { Observable, combineLatestWith, tap, filter } from 'rxjs';
import { Address } from '@common/web3/models/address.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  constructor(private store: Store, private web3Service: Web3Service, private router: Router, private ngZone: NgZone) {}

  public onAccountChanged$(): Observable<[Address, Address]> {
    return this.web3Service.onAccountChanged$().pipe(
      combineLatestWith(this.store.select(Web3Selectors.address)),
      filter(([updatedAddress, currentAddress]: [Address, Address]): boolean => updatedAddress !== currentAddress),
      tap(([updatedAddress, _]): void => {
        this.store.dispatch(Web3Actions.accountChanged({ address: updatedAddress }));
      }),
      filter(([updatedAddress, _]): boolean => updatedAddress === null),
      tap((): void => {
        this.ngZone.run((): void => {
          this.router.navigateByUrl('/');
        });
      })
    );
  }

  public onChainChanged$(): Observable<unknown> {
    return this.web3Service.onChainChanged$();
  }
}

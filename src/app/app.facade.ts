import { Web3Actions, Web3Selectors } from '@store/web3';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Service } from '@common/web3/services/web3.service';
import { Observable, combineLatestWith, tap, take } from 'rxjs';
import { Address } from '@common/web3/models/address.model';
import { Router } from '@angular/router';

@Injectable()
export class AppFacade {
  constructor(private store: Store, private web3Service: Web3Service, private router: Router) {}

  public onAccountChanged$(): Observable<[Address, Address]> {
    return this.web3Service.onAccountChanged$().pipe(
      combineLatestWith(this.store.select(Web3Selectors.address)),
      tap(([updatedAddress, currentAddress]: [Address, Address]): void => {
        if (updatedAddress !== currentAddress) {
          this.store.dispatch(Web3Actions.accountChanged({ address: updatedAddress }));
        } else if (updatedAddress === null) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }

  public onChainChanged$() {
    return this.web3Service.onChainChanged$();
  }
}

import { Injectable } from '@angular/core';
import { Web3Selectors } from '@store/web3';
import { Store } from '@ngrx/store';
import { providers } from 'ethers';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileFacade {
  constructor(private store: Store) {}

  // NgRx selectors //
  public selectProvider$(): Observable<providers.Web3Provider | null> {
    return this.store.select(Web3Selectors.provider);
  }
  // NgRx selectors end //
}

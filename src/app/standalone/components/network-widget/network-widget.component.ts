import { NetworkNamePipe } from '@standalone/pipes/network-name.pipe';
import { Web3Selectors } from '@store/web3';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChainId } from '@common/web3/models/chain-id.model';

@Component({
  selector: 'nft-network-widget',
  standalone: true,
  imports: [CommonModule, NetworkNamePipe],
  template: `
    <ng-container *ngIf="isNetworkLoading$ | async; else loaded">Loading...</ng-container>
    <ng-template #loaded>
      <div
        *ngIf="isMetamaskInstalled$ | async"
        class="flex items-center py-1 px-3  border-[green] bg-green-700 border rounded-xl ">
        <span class="block w-[5px] h-[5px] bg-green-300 rounded-2xl mr-3"></span>
        <span> {{ chainId$ | async | networkName }}</span>
      </div>
    </ng-template>
  `,
})
export class NetworkWidgetComponent {
  public chainId$: Observable<ChainId> = this.store.select(Web3Selectors.chainId);
  public isMetamaskInstalled$: Observable<boolean> = this.store.select(Web3Selectors.isMetamaskInstalled);
  public isNetworkLoading$: Observable<boolean> = this.store.select(Web3Selectors.isNetworkLoading);

  constructor(private store: Store) {}
}

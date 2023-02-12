import { NetworkNamePipe } from '@standalone/pipes/network-name.pipe';
import { Web3Selectors } from '@store/web3';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChainId } from '@common/web3/models/chain-id.model';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';

@Component({
  selector: 'nft-network-widget',
  standalone: true,
  imports: [CommonModule, NetworkNamePipe, PRIMENG_UI],
  template: `
    <ng-container *ngIf="isNetworkLoading$ | async; else loaded">Loading...</ng-container>

    <ng-template #loaded>
      <button
        *ngIf="isMetamaskInstalled$ | async"
        class="flex items-center py-1 px-3 p-button-outlined p-button-info"
        [label]="chainId$ | async | networkName"
        disabled
        pButton>
        <span class="block w-[5px] h-[5px] rounded-2xl mr-3 network-indicator-color"></span>
        <span> </span>
      </button>
    </ng-template>
  `,
  styleUrls: ['./network-widget.component.scss'],
})
export class NetworkWidgetComponent {
  public chainId$: Observable<ChainId> = this.store.select(Web3Selectors.chainId);
  public isMetamaskInstalled$: Observable<boolean> = this.store.select(Web3Selectors.isMetamaskInstalled);
  public isNetworkLoading$: Observable<boolean> = this.store.select(Web3Selectors.isNetworkLoading);

  constructor(private store: Store) {}
}

import { NetworkNamePipe } from '@standalone/pipes/network-name.pipe';
import { Web3Selectors } from '@store/web3';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'nftm-network-widget',
  standalone: true,
  imports: [CommonModule, NetworkNamePipe],
  template: `
    <div class="border rounded-xl py-1 px-3 flex items-center border-[green] bg-green-700">
      <span class="block w-[5px] h-[5px] bg-green-300 rounded-2xl mr-3"></span>
      <ng-container *ngIf="isLoading$ | async; else loaded">Loading...</ng-container>
      <ng-template #loaded>{{ chainId$ | async | networkName }}</ng-template>
    </div>
  `,
})
export class NetworkWidgetComponent {
  public chainId$: Observable<number | null> = this.store.select(Web3Selectors.chainId);
  public isLoading$: Observable<boolean> = this.store.select(Web3Selectors.isLoading);

  constructor(private store: Store) {}
}

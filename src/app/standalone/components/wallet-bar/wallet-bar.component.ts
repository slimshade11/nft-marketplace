import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from '@common/web3/services/web3.service';
import { Web3Selectors } from '@app/store/web3';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';

@Component({
  selector: 'nftm-wallet-bar',
  standalone: true,
  imports: [CommonModule, PRIMENG_UI],
  template: `
    <ng-container *ngIf="isLoading$ | async; else loaded">
      <button
        pButton
        icon="pi pi-spin pi-spinner"
        label="Loading"
        class="block min-w-[60px]"></button>
    </ng-container>
    <ng-template #loaded>
      <ng-container *ngIf="(address$ | async) !== null; else walletButton">
        <p-menu
          #menu
          [model]="links"
          [popup]="true">
        </p-menu>
        <p-avatar
          #avatar
          (click)="menu.toggle($event)"
          label="P"
          class="cursor-pointer"
          pTooltip="{{ '0x...' + (address$ | async | slice : -6) }}">
        </p-avatar>
      </ng-container>
      <ng-template #walletButton>
        <ng-container *ngIf="web3.provider; else installMetamask">
          <button
            (click)="web3.connectWallet()"
            pButton
            label="Connect"></button>
        </ng-container>
        <ng-template #installMetamask>
          <a
            href="https://metamask.io/download/"
            target="_blank">
            <button
              pButton
              label="Install Metamask"></button>
          </a>
        </ng-template>
      </ng-template>
    </ng-template>
  `,
})
export class WalletBarComponent {
  @Input() public links!: MenuItem[];

  public address$: Observable<string | null> = this.store.select(Web3Selectors.address);
  public isLoading$: Observable<boolean> = this.store.select(Web3Selectors.isLoading);

  constructor(public web3: Web3Service, private store: Store) {}
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { providers } from 'ethers';

@Component({
  selector: 'nftm-errors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="provider === null">
      <div class="bg-red-900 border border-red-500 p-1 text-center rounded-md">
        No provider, please
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target="_blank"
          class="hover:underline">
          install Metamask
        </a>
      </div>
    </ng-container>
  `,
})
export class ErrorsComponent {
  @Input() provider!: providers.Web3Provider | null;
}

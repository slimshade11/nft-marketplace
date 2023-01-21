import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nftm-navbar></nftm-navbar>
    <div class="px-3 max-w-screen-2xl mx-auto">
      <router-outlet></router-outlet>
    </div>
    <nftm-footer></nftm-footer>
  `,
})
export class AppComponent {
  title = 'nft-marketplace';
}

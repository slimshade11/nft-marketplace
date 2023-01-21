import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <div class="px-3 max-w-screen-2xl mx-auto">
        <nftm-navbar></nftm-navbar>
        <router-outlet></router-outlet>
        <nftm-footer></nftm-footer>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'nft-marketplace';
}

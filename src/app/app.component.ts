import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <nftm-navbar></nftm-navbar>
    <div class="px-3 max-w-screen-xl mx-auto">
      <router-outlet></router-outlet>
    </div>
    <nftm-footer></nftm-footer>
  `,
})
export class AppComponent implements OnInit {
  title = 'nft-marketplace';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}

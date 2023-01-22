import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <nftm-navbar></nftm-navbar>
    <div class="max-w-screen-xl px-3 mx-auto ">
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

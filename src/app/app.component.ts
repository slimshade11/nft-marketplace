import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Actions } from '@store/web3';
import { PrimeNGConfig } from 'primeng/api';
import { Web3Service } from '@common/web3/services/web3.service';

@Component({
  selector: 'app-root',
  template: `
    <nftm-navbar></nftm-navbar>

    <main class="max-w-screen-xl px-3 mx-auto ">
      <router-outlet></router-outlet>
    </main>

    <nftm-footer></nftm-footer>

    <p-toast position="bottom-center"></p-toast>
  `,
})
export class AppComponent extends DestroyComponent implements OnInit {
  constructor(private store: Store, private primengConfig: PrimeNGConfig, private web3Service: Web3Service) {
    super();
    this.store.dispatch(Web3Actions.loadContract());
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.web3Service.onAccountChanged$().subscribe();
    this.store.dispatch(Web3Actions.getMetamaskState());
  }
}

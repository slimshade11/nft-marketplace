import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Actions } from '@store/web3';
import { PrimeNGConfig } from 'primeng/api';
import { AppFacade } from '@app/app.facade';

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
  constructor(private store: Store, private primengConfig: PrimeNGConfig, private appFacade: AppFacade) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.store.dispatch(Web3Actions.getMetamaskState());
    this.store.dispatch(Web3Actions.loadContract());
    this.store.dispatch(Web3Actions.getChainId());
    this.appFacade.onAccountChanged$().subscribe();
  }
}

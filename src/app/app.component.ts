import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Actions } from '@store/web3';
import { PrimeNGConfig } from 'primeng/api';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { ResolveLoaderService } from '@common/services/resolve-loader.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="fixed h-[.25rem] top-0 left-0 right-0 overflow-hidden">
      <p-progressBar *ngIf="isLoading$ | async" mode="indeterminate" class="h-full"></p-progressBar>
    </div>

    <nft-navbar></nft-navbar>
    <main class="max-w-screen-xl px-3 mx-auto main-content">
      <router-outlet></router-outlet>
    </main>
    <nft-footer></nft-footer>

    <p-toast position="bottom-center"></p-toast>
  `,
})
export class AppComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.resolveLoaderService.handleLoaderVisibility$();

  constructor(
    private resolveLoaderService: ResolveLoaderService,
    private store: Store,
    private primengConfig: PrimeNGConfig,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.dispatchStoreActions();
    this.appFacade.onAccountChanged$().subscribe();
    this.appFacade.onChainChanged$().subscribe();
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(Web3Actions.getMetamaskState());
    this.store.dispatch(Web3Actions.loadContract());
    this.store.dispatch(Web3Actions.getChainData());
  }
}

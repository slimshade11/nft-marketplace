import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Actions } from '@store/web3';
import { PrimeNGConfig } from 'primeng/api';
import { AppFacade } from '@app/app.facade';
import { Observable, takeUntil } from 'rxjs';
import { ResolveLoaderService } from '@common/services/resolve-loader.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="fixed h-[.25rem] top-0 left-0 right-0 overflow-hidden">
      <p-progressBar *ngIf="isLoading$ | async" mode="indeterminate"></p-progressBar>
    </div>

    <nft-navbar></nft-navbar>
    <main class="max-w-screen-xl px-3 mx-auto main-content">
      <router-outlet></router-outlet>
    </main>
    <nft-footer></nft-footer>

    <p-toast position="bottom-center"></p-toast>
  `,
})
export class AppComponent extends DestroyComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.resolveLoaderService.handleResolveProgressBarVisibility$();

  constructor(
    private resolveLoaderService: ResolveLoaderService,
    private store: Store,
    private primengConfig: PrimeNGConfig,
    private appFacade: AppFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.dispatchStoreActions();
    this.appFacade.onAccountChanged$().pipe(takeUntil(this.destroy$)).subscribe();
    this.appFacade.onChainChanged$().pipe(takeUntil(this.destroy$)).subscribe();
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(Web3Actions.getMetamaskState());
    this.store.dispatch(Web3Actions.loadContract());
    this.store.dispatch(Web3Actions.getChainData());
  }
}

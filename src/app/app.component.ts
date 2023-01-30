import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit, Self } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Actions } from '@store/web3';
import { PrimeNGConfig } from 'primeng/api';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { ResolveLoaderService } from '@common/services/resolve-loader.service';

@Component({
  selector: 'app-root',
  template: `
    <p-progressBar
      *ngIf="isLoading$ | async"
      styleClass="h-[.25rem]"
      mode="indeterminate"></p-progressBar>
    <nftm-navbar></nftm-navbar>

    <main class="max-w-screen-xl px-3 mx-auto ">
      <router-outlet></router-outlet>
    </main>

    <nftm-footer></nftm-footer>

    <p-toast position="bottom-center"></p-toast>
  `,
})
export class AppComponent extends DestroyComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.resolveLoadedService.handleResolveProgressBarVisibility$();

  constructor(
    private resolveLoadedService: ResolveLoaderService,
    private store: Store,
    private primengConfig: PrimeNGConfig,
    private appFacade: AppFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.dispatchStoreActions();
    this.appFacade.onAccountChanged$().subscribe();
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(Web3Actions.getMetamaskState());
    this.store.dispatch(Web3Actions.loadContract());
    this.store.dispatch(Web3Actions.getChainId());
  }
}

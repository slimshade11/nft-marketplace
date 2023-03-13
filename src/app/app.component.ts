import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Web3Actions } from '@store/web3';
import { PrimeNGConfig } from 'primeng/api';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { ResolveLoaderService } from '@common/services/resolve-loader.service';
import { NFT } from '@common/web3/models/nft.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public isLoading$: Observable<boolean> = inject(ResolveLoaderService).handleLoaderVisibility$();

  constructor(private store: Store, private primengConfig: PrimeNGConfig, private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.dispatchStoreActions();
    this.appFacade.onAccountChanged$().subscribe();
    this.appFacade.onChainChanged$().subscribe();

    this.appFacade.getContract$().subscribe(async (contract) => {
      const nfts: Array<NFT> = await contract?.['getAllNftsOnSale']();
    });
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(Web3Actions.getMetamaskState());
    this.store.dispatch(Web3Actions.loadContract());
    this.store.dispatch(Web3Actions.getChainData());
  }
}

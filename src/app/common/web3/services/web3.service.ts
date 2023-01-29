import { MetamaskEventName } from '@common/web3/enums/metamask-event-name.enum';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '@common/models/app-config.model';
import { APP_CONFIG_TOKEN } from '@common/config/app.config';
import { forkJoin, fromEvent, map, Observable, tap } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { State as Web3State } from '@store/web3';
import { Contract, ethers, providers } from 'ethers';
import { Store } from '@ngrx/store';
import { NftMarket } from '@common/constants/market-contract-name';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable()
export class Web3Service {
  private ethereum!: MetaMaskInpageProvider;
  private provider!: providers.Web3Provider;

  constructor(@Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig, private http: HttpClient, private store: Store) {
    // FIXME: Redux devtool crash on create default state

    this.ethereum = window.ethereum;
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum as any);
    }
  }

  // React source code:
  // https://github.com/Jerga99/nft-marketplace/blob/a64d2eb30576b44f276ea0748597bca85473b71c/components/hooks/web3/useAccount.ts

  public createDefaultWeb3State$(): Observable<Web3State> {
    return forkJoin({
      contract: this.loadContract(NftMarket),
      accounts: this.provider.listAccounts(),
    }).pipe(
      map(({ contract, accounts }: { contract: Contract | null; accounts: string[] }): Web3State => {
        return {
          isMetamaskInstalled: !!this.ethereum,
          address: accounts[0] ?? null,
          contract: contract,
          isLoading: false,
        };
      })
    );
  }

  private loadContract(name: string): Observable<Contract> {
    return this.http.get<any>(`/assets/contracts/${name}.json`).pipe(
      map((artifact: any): Contract => {
        return new ethers.Contract(artifact.networks[this.appConfig.networkId].address, artifact.abi, this.provider);
      })
    );
  }

  public onAccountChanged$(): Observable<string | null> {
    return (fromEvent(this.ethereum, MetamaskEventName.ACCOUNTS_CHANGED) as Observable<string[]>).pipe(
      map((address: string[]) => address[0] ?? null)
    );
  }

  public connectWallet(): void {
    try {
      this.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (e) {
      console.error(e);
    }
  }
}

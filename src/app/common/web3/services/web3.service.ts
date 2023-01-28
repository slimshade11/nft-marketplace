import { AppConfig } from '@common/models/app-config.model';
import { APP_CONFIG_TOKEN } from '@common/config/app.config';
import { combineLatestWith, finalize, from, fromEvent, map, Observable, of, take, tap } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { State as Web3State } from '@store/web3';
import { Contract, ethers, providers } from 'ethers';
import { MetamaskEventName } from '@common/web3/enums/metamask-event-name.enum';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable()
export class Web3Service {
  private ethereum!: MetaMaskInpageProvider;
  private provider!: providers.Web3Provider;
  public currentAddress!: string;

  constructor(@Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig) {
    // FIXME: Redux devtool crash on account change

    this.ethereum = window.ethereum;
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum as any);
    }
  }

  public createDefaultWeb3State$(): Observable<Web3State> {
    return from(this.loadContract('NftMarket', this.provider)).pipe(
      combineLatestWith(from(this.provider.listAccounts())),
      map(([contract, accounts]: [Contract | null, string[]]): Web3State => {
        return {
          isMetamaskInstalled: !!this.ethereum,
          address: accounts[0] ?? '',
          contract,
          isLoading: false,
        };
      })
    );
  }

  private async loadContract(name: string, provider: providers.Web3Provider): Promise<Contract | null> {
    let contract: Contract | null = null;
    const response = await fetch(`/assets/contracts/${name}.json`);
    const Artifact = await response.json();

    if (Artifact.networks[this.appConfig.networkId].address) {
      contract = new ethers.Contract(Artifact.networks[this.appConfig.networkId].address, Artifact.abi, provider);
    }

    return contract;
  }

  public onAccountChanged$(): Observable<string> {
    return (fromEvent(this.ethereum, MetamaskEventName.ACCOUNTS_CHANGED) as Observable<string[]>).pipe(
      map((address: string[]) => address[0] ?? '')
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

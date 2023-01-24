import { AppConfig } from '@common_models/app-config.model';
import { APP_CONFIG_TOKEN } from '@common_config/app.config';
import { from, map, Observable, of, take, tap } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { State as Web3State } from '@store/web3';
import { Contract, ethers, providers } from 'ethers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable()
export class Web3Service {
  constructor(@Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig) {}

  public createDefaultWeb3State$(): Observable<Web3State> {
    const ethereum: MetaMaskInpageProvider = window.ethereum;
    const provider: providers.Web3Provider = new ethers.providers.Web3Provider(ethereum as any);

    return from(this.loadContract('NftMarket', provider)).pipe(
      take(1),
      map((contract: Contract) => ({
        ethereum,
        provider,
        contract,
        isLoading: false,
      }))
    );
  }

  public async loadContract(name: string, provider: providers.Web3Provider): Promise<Contract> {
    if (!this.appConfig.networkId) return Promise.reject('Network ID is not defined!');

    const response = await fetch(`/assets/contracts/${name}.json`);
    const Artifact = await response.json();

    if (Artifact.networks[this.appConfig.networkId].address) {
      const contract: Contract = new ethers.Contract(
        Artifact.networks[this.appConfig.networkId].address,
        Artifact.abi,
        provider
      );

      return contract;
    } else {
      return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
  }
}

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { State as Web3State } from '@store/web3';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable()
export class Web3Service {
  public createDefaultWeb3State$(): Observable<Web3State> {
    const ethereum: MetaMaskInpageProvider = window.ethereum;
    const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(ethereum as any);

    return of({
      ethereum,
      provider,
      contract: null,
      isLoading: false,
    });
  }
}

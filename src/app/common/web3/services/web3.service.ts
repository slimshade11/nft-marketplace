import { Address } from '@common/web3/models/address.model';
import { MetamaskEventName } from '@common/web3/enums/metamask-event-name.enum';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '@common/models/app-config.model';
import { APP_CONFIG_TOKEN } from '@common/config/app.config';
import { BehaviorSubject, fromEvent, from, map, Observable, tap, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, ethers, providers } from 'ethers';
import { GetMetamaskStatePayload } from '@common/web3/models/get-metamask-state-payload.model';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable()
export class Web3Service {
  private _marketContract$: BehaviorSubject<Readonly<Contract> | null> = new BehaviorSubject<Readonly<Contract> | null>(
    null
  );
  private ethereum!: MetaMaskInpageProvider;
  public provider!: providers.Web3Provider;

  constructor(@Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig, private http: HttpClient) {
    this.ethereum = window.ethereum;

    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum as any);
    }
  }

  public getMetamaskState$(): Observable<GetMetamaskStatePayload> {
    return from(this.provider.listAccounts()).pipe(
      map((accounts: string[]): GetMetamaskStatePayload => {
        return {
          isMetamaskInstalled: !!this.ethereum,
          address: accounts[0] ?? null,
        };
      })
    );
  }

  public loadContract$(name: string): Observable<Readonly<Contract>> {
    return this.http.get<any>(`/assets/contracts/${name}.json`).pipe(
      map((artifact: any): Readonly<Contract> => {
        return new ethers.Contract(artifact.networks[this.appConfig.networkId].address, artifact.abi, this.provider);
      }),
      tap((contract: Readonly<Contract>): void => {
        this._marketContract$.next(contract);
      })
    );
  }

  public onAccountChanged$(): Observable<Address> {
    return (fromEvent(this.ethereum, MetamaskEventName.ACCOUNTS_CHANGED) as Observable<string[]>).pipe(
      map((address: string[]): Address => address[0] ?? null)
    );
  }

  public connectWallet(): void {
    try {
      this.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err: unknown) {
      console.error(err);
    }
  }

  public async getChainId(): Promise<number | null> {
    let chainId: number | null = null;
    if (this.provider) {
      chainId = (await this.provider.getNetwork()).chainId;
    }

    return chainId;
  }

  public get marketContract$(): Observable<Readonly<Contract> | null> {
    return this._marketContract$.asObservable();
  }
}

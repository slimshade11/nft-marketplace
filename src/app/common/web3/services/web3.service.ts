import { NETWORKS } from '@common/web3/constants/networks';
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
import { ChainId } from '@common/web3/models/chain-id.model';
import { GetChainIdPayload } from '@common/web3/models/get-chain-id-payload.model';
import { ToastService } from '@common/services/toast.service';
import { ToastStatus } from '@common/enums/toast-status.enum';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private _marketContract$: BehaviorSubject<Readonly<Contract> | null> = new BehaviorSubject<Readonly<Contract> | null>(null);

  private _ethereum: MetaMaskInpageProvider = window.ethereum;
  private readonly _targetNetwork: string = NETWORKS[this.appConfig.targetChainId];

  public provider!: providers.Web3Provider;

  constructor(@Inject(APP_CONFIG_TOKEN) private appConfig: AppConfig, private http: HttpClient, private toastService: ToastService) {
    try {
      this.provider = new ethers.providers.Web3Provider(<any>this._ethereum);
    } catch (e) {
      this.toastService.showMessage(ToastStatus.WARN, 'No provider detected', 'Please install Metamask');
      console.error('No provider detected, please install Metamask...');
    }
  }

  public getMetamaskState$(): Observable<GetMetamaskStatePayload> {
    return from(this.provider.listAccounts()).pipe(
      map((accounts: string[]): GetMetamaskStatePayload => {
        return {
          isMetamaskInstalled: !!this._ethereum,
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
    return (fromEvent(this._ethereum, MetamaskEventName.ACCOUNTS_CHANGED) as Observable<string[]>).pipe(
      map((address: string[]): Address => address[0] ?? null)
    );
  }

  public connectWallet(): void {
    try {
      this._ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err: unknown) {
      console.error(err);
    }
  }

  public async getChainId(): Promise<GetChainIdPayload> {
    const chainId: ChainId = (await this.provider.getNetwork()).chainId;
    const networkName: string = NETWORKS[chainId];
    const isNetworkSupported: boolean = networkName === this._targetNetwork;

    return { chainId, networkName, isNetworkSupported };
  }

  public onChainChanged$(): Observable<unknown> {
    return fromEvent(this._ethereum, MetamaskEventName.CHAIN_CHANGED).pipe(tap((): void => window.location.reload()));
  }
}

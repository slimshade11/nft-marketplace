import { createReducer, on } from '@ngrx/store';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, providers } from 'ethers';
import { Web3Actions } from '@store/web3';

export const FeatureKey = 'web3';

export interface State {
  ethereum: MetaMaskInpageProvider | null;
  provider: providers.Web3Provider | null;
  contract: Contract | null;
  isLoading: boolean;
}

const initialState: State = {
  ethereum: null,
  provider: null,
  contract: null,
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,
  on(Web3Actions.createDefaultState, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(Web3Actions.createDefaultStateSuccess, (state, { web3State }): State => {
    console.log(222);
    return { ...state, isLoading: web3State.isLoading, ethereum: web3State.ethereum };
  }),
  on(Web3Actions.createDefaultStateFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);

import { createReducer, on } from '@ngrx/store';
import { Web3Actions } from '@store/web3';

export const FeatureKey = 'web3';

export interface State {
  isMetamaskInstalled: boolean;
  address: string | null;
  isAddressLoading: boolean;
  chainId: number | null;
  networkName: string | null;
  isNetworkSupported: boolean;
  isNetworkLoading: boolean;
}

const initialState: State = {
  isMetamaskInstalled: false,
  address: null,
  isAddressLoading: false,
  chainId: null,
  networkName: null,
  isNetworkSupported: false,
  isNetworkLoading: false,
};

export const Reducer = createReducer(
  initialState,

  // Get metamask state
  on(Web3Actions.getMetamaskState, (state): State => {
    return { ...state, isAddressLoading: true };
  }),
  on(Web3Actions.getMetamaskStateSuccess, (state, { metamaskStatePayload: { isMetamaskInstalled, address } }): State => {
    return {
      ...state,
      isMetamaskInstalled,
      address,
      isAddressLoading: false,
    };
  }),
  on(Web3Actions.getMetamaskStateFailure, (state): State => {
    return { ...state, isAddressLoading: false };
  }),

  // AccountChanged
  on(Web3Actions.accountChanged, (state): State => {
    return { ...state, isAddressLoading: true };
  }),
  on(Web3Actions.accountChangedSuccess, (state, { address }): State => {
    return { ...state, isAddressLoading: false, address };
  }),
  on(Web3Actions.accountChangedFailure, (state): State => {
    return { ...state, isAddressLoading: false };
  }),

  // Get chainId
  on(Web3Actions.getChainData, (state): State => {
    return { ...state, isNetworkLoading: true };
  }),
  on(Web3Actions.getChainDataSuccess, (state, { getChainIdPayload: { chainId, isNetworkSupported, networkName } }): State => {
    return { ...state, isNetworkLoading: false, chainId, isNetworkSupported, networkName };
  }),
  on(Web3Actions.getChainDataFailure, (state): State => {
    return { ...state, isNetworkLoading: false };
  })
);

import { Address } from '@common/web3/models/address.model';
import { ChainId } from '@common/web3/models/chain-id.model';
import { createReducer, on } from '@ngrx/store';
import { Web3Actions } from '@store/web3';

export const FeatureKey = 'web3';

export interface State {
  isMetamaskInstalled: boolean;
  address: Address;
  chainId: ChainId;
  networkName: string | null;
  isNetworkSupported: boolean;
  isPerforming: boolean;
}

const initialState: State = {
  isMetamaskInstalled: false,
  address: null,
  chainId: null,
  networkName: null,
  isNetworkSupported: false,
  isPerforming: false,
};

export const Reducer = createReducer(
  initialState,

  // Get metamask state
  on(Web3Actions.getMetamaskState, (state): State => {
    return { ...state, isPerforming: true };
  }),
  on(Web3Actions.getMetamaskStateSuccess, (state, { metamaskStatePayload: { isMetamaskInstalled, address } }): State => {
    return {
      ...state,
      isMetamaskInstalled,
      address,
      isPerforming: false,
    };
  }),
  on(Web3Actions.getMetamaskStateFailure, (state): State => {
    return { ...state, isPerforming: false };
  }),

  // AccountChanged
  on(Web3Actions.accountChanged, (state, { address }): State => {
    return { ...state, address };
  }),

  // Get chainId
  on(Web3Actions.getChainData, (state): State => {
    return { ...state, isPerforming: true };
  }),
  on(Web3Actions.getChainDataSuccess, (state, { getChainIdPayload: { chainId, isNetworkSupported, networkName } }): State => {
    return { ...state, isPerforming: false, chainId, isNetworkSupported, networkName };
  }),
  on(Web3Actions.getChainDataFailure, (state): State => {
    return { ...state, isPerforming: false };
  })
);

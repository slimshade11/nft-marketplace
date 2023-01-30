import { createReducer, on } from '@ngrx/store';
import { Web3Actions } from '@store/web3';

export const FeatureKey = 'web3';

export interface State {
  isMetamaskInstalled: boolean;
  address: string | null;
  chainId: number | null;
  isLoading: boolean;
}

const initialState: State = {
  isMetamaskInstalled: false,
  address: null,
  isLoading: false,
  chainId: null,
};

export const Reducer = createReducer(
  initialState,

  // Get metamask state
  on(Web3Actions.getMetamaskState, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(
    Web3Actions.getMetamaskStateSuccess,
    (state, { metamaskStatePayload: { isMetamaskInstalled, address } }): State => {
      return {
        ...state,
        isMetamaskInstalled,
        address,
        isLoading: false,
      };
    }
  ),
  on(Web3Actions.getMetamaskStateFailure, (state): State => {
    return { ...state, isLoading: false };
  }),

  // AccountChanged
  on(Web3Actions.accountChanged, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(Web3Actions.accountChangedSuccess, (state, { address }): State => {
    return { ...state, isLoading: false, address };
  }),
  on(Web3Actions.accountChangedFailure, (state): State => {
    return { ...state, isLoading: false };
  }),

  // Get chainId
  on(Web3Actions.getChainId, (state): State => {
    return { ...state };
  }),
  on(Web3Actions.getChainIdSuccess, (state, { chainId }): State => {
    return { ...state, chainId };
  }),
  on(Web3Actions.getChainIdFailure, (state): State => {
    return { ...state };
  })
);

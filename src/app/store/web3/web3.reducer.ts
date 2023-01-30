import { createReducer, on } from '@ngrx/store';
import { Contract } from 'ethers';
import { Web3Actions } from '@store/web3';

export const FeatureKey = 'web3';

export interface State {
  isMetamaskInstalled: boolean;
  address: string | null;
  contract: Readonly<Contract> | null;
  isLoading: boolean;
}

const initialState: State = {
  isMetamaskInstalled: false,
  address: null,
  contract: null,
  isLoading: false,
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

  // Load Contract
  on(Web3Actions.loadContract, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(Web3Actions.loadContractSuccess, (state, { contract }): State => {
    return { ...state, isLoading: false, contract };
  }),
  on(Web3Actions.loadContractFailure, (state): State => {
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
  })
);

import { createReducer, on } from '@ngrx/store';
import { Contract } from 'ethers';
import { Web3Actions } from '@store/web3';

export const FeatureKey = 'web3';

export interface State {
  isMetamaskInstalled: boolean;
  address: string;
  contract: Contract | null;
  isLoading: boolean;
}

const initialState: State = {
  isMetamaskInstalled: false,
  address: '',
  contract: null,
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,
  on(Web3Actions.createDefaultState, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(
    Web3Actions.createDefaultStateSuccess,
    (state, { web3State: { isLoading, isMetamaskInstalled, contract, address } }): State => {
      return Object.freeze({
        isMetamaskInstalled,
        address,
        contract,
        isLoading,
      });
    }
  ),
  on(Web3Actions.createDefaultStateFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(Web3Actions.accountChanged, (state): State => {
    return Object.freeze({ ...state, isLoading: true });
  }),
  on(Web3Actions.accountChangedSuccess, (state, { address }): State => {
    console.log('address from reducer', address);
    return Object.freeze({ ...state, isLoading: false, address });
  }),
  on(Web3Actions.accountChangedFailure, (state): State => {
    return Object.freeze({ ...state, isLoading: false });
  })
);

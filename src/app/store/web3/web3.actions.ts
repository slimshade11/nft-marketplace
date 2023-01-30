import { Address } from '@common/web3/models/address.model';
import { GetMetamaskStatePayload } from '@common/web3/models/get-metamask-state-payload.model';
import { createAction, props } from '@ngrx/store';
import { Web3ActionTypes } from '@web3_store/web3-action-types';

// Get metamask state
export const getMetamaskState = createAction(Web3ActionTypes.GET_METAMASK_STATE);
export const getMetamaskStateSuccess = createAction(
  Web3ActionTypes.GET_METAMASK_STATE_SUCCESS,
  props<{ metamaskStatePayload: GetMetamaskStatePayload }>()
);
export const getMetamaskStateFailure = createAction(Web3ActionTypes.GET_METAMASK_STATE_FAILURE);

// Load contract
export const loadContract = createAction(Web3ActionTypes.LOAD_CONTRACT);

// Accounts changed
export const accountChanged = createAction(Web3ActionTypes.ACCOUNT_CHANGED, props<{ address: Address }>());
export const accountChangedSuccess = createAction(
  Web3ActionTypes.ACCOUNT_CHANGED_SUCCESS,
  props<{ address: Address }>()
);
export const accountChangedFailure = createAction(Web3ActionTypes.ACCOUNT_CHANGED_FAILURE);

// Get network
export const getChainId = createAction(Web3ActionTypes.GET_CHAIN_ID);
export const getChainIdSuccess = createAction(
  Web3ActionTypes.GET_CHAIN_ID_SUCCESS,
  props<{ chainId: number | null }>()
);
export const getChainIdFailure = createAction(Web3ActionTypes.GET_CHAIN_ID_FAILURE);

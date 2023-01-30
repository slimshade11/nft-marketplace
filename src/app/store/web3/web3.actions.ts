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
export const accountChanged = createAction(Web3ActionTypes.ACCOUNT_CHANGED, props<{ address: string | null }>());
export const accountChangedSuccess = createAction(
  Web3ActionTypes.ACCOUNT_CHANGED_SUCCESS,
  props<{ address: string | null }>()
);
export const accountChangedFailure = createAction(Web3ActionTypes.ACCOUNT_CHANGED_FAILURE);

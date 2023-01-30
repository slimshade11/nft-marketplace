import { GetMetamaskStatePaylaod } from '@common/web3/models/get-metamask-state-payload.model';
import { createAction, props } from '@ngrx/store';
import { Web3ActionTypes } from '@web3_store/web3-action-types';
import { Contract } from 'ethers';

// Get metamask state
export const getMetamaskState = createAction(Web3ActionTypes.GET_METAMASK_STATE);
export const getMetamaskStateSuccess = createAction(
  Web3ActionTypes.GET_METAMASK_STATE_SUCCESS,
  props<{ metamaskStatePayload: GetMetamaskStatePaylaod }>()
);
export const getMetamaskStateFailure = createAction(Web3ActionTypes.GET_METAMASK_STATE_FAILURE);

// Get contract
export const loadContract = createAction(Web3ActionTypes.LOAD_CONTRACT);
export const loadContractSuccess = createAction(
  Web3ActionTypes.LOAD_CONTRACT_SUCCESS,
  props<{ contract: Readonly<Contract> }>()
);
export const loadContractFailure = createAction(Web3ActionTypes.LOAD_CONTRACT_FAILURE);

// Accounts changed
export const accountChanged = createAction(Web3ActionTypes.ACCOUNT_CHANGED, props<{ address: string | null }>());
export const accountChangedSuccess = createAction(
  Web3ActionTypes.ACCOUNT_CHANGED_SUCCESS,
  props<{ address: string | null }>()
);
export const accountChangedFailure = createAction(Web3ActionTypes.ACCOUNT_CHANGED_FAILURE);

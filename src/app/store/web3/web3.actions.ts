import { Address } from '@common/web3/models/address.model';
import { GetMetamaskStatePayload } from '@common/web3/models/get-metamask-state-payload.model';
import { createAction, props } from '@ngrx/store';
import { GetChainIdPayload } from '@common/web3/models/get-chain-id-payload.model';
import { Web3ActionTypes } from '@store/web3/web3-action-types';

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

// Get network
export const getChainData = createAction(Web3ActionTypes.GET_CHAIN_DATA);
export const getChainDataSuccess = createAction(Web3ActionTypes.GET_CHAIN_DATA_SUCCESS, props<{ getChainIdPayload: GetChainIdPayload }>());
export const getChainDataFailure = createAction(Web3ActionTypes.GET_CHAIN_DATA_FAILURE);

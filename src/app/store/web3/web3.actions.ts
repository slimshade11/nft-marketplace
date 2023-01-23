import { State as Web3State } from '@store/web3';
import { createAction, props } from '@ngrx/store';
import { Web3ActionTypes } from '@web3_store/web3-action-types';

export const createDefaultState = createAction(Web3ActionTypes.CREATE_DEFAULT_STATE);
export const createDefaultStateSuccess = createAction(
  Web3ActionTypes.CREATE_DEFAULT_STATE_SUCCESS,
  props<{ web3State: Web3State }>()
);
export const createDefaultStateFailure = createAction(Web3ActionTypes.CREATE_DEFAULT_STATE_FAILURE);

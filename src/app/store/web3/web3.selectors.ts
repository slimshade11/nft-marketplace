import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKey, State } from '@web3_store/web3.reducer';

export const Web3State = createFeatureSelector<State>(FeatureKey);

export const isLoading = createSelector(Web3State, ({ isLoading }: State): boolean => isLoading);
export const address = createSelector(Web3State, ({ address }: State): string | null => address);
export const isMetamaskInstalled = createSelector(
  Web3State,
  ({ isMetamaskInstalled }: State): boolean => isMetamaskInstalled
);

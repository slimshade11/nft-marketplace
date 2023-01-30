import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKey, State as Web3State } from '@web3_store/web3.reducer';

export const Web3StateSelector = createFeatureSelector<Web3State>(FeatureKey);

export const isAddressLoading = createSelector(
  Web3StateSelector,
  ({ isAddressLoading }: Web3State): boolean => isAddressLoading
);
export const address = createSelector(Web3StateSelector, ({ address }: Web3State): string | null => address);
export const chainId = createSelector(Web3StateSelector, ({ chainId }: Web3State): number | null => chainId);
export const isMetamaskInstalled = createSelector(
  Web3StateSelector,
  ({ isMetamaskInstalled }: Web3State): boolean => isMetamaskInstalled
);

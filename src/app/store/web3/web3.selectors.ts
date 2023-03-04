import { Address } from '@common/web3/models/address.model';
import { ChainId } from '@common/web3/models/chain-id.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKey, State as Web3State } from '@store/web3/web3.reducer';

export const Web3StateSelector = createFeatureSelector<Web3State>(FeatureKey);

export const address = createSelector(Web3StateSelector, ({ address }: Web3State): Address => address);
export const isMetamaskInstalled = createSelector(Web3StateSelector, ({ isMetamaskInstalled }: Web3State): boolean => isMetamaskInstalled);
export const chainId = createSelector(Web3StateSelector, ({ chainId }: Web3State): ChainId => chainId);
export const networkName = createSelector(Web3StateSelector, ({ networkName }: Web3State): string | null => networkName);
export const isNetworkSupported = createSelector(Web3StateSelector, ({ isNetworkSupported }: Web3State): boolean => isNetworkSupported);
export const isPerforming = createSelector(Web3StateSelector, ({ isPerforming }: Web3State): boolean => isPerforming);

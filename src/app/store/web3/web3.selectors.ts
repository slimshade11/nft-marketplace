import { Contract, providers } from 'ethers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureKey, State } from '@web3_store/web3.reducer';
import { MetaMaskInpageProvider } from '@metamask/providers';

export const Web3State = createFeatureSelector<State>(FeatureKey);

export const isLoading = createSelector(Web3State, ({ isLoading }: State): boolean => isLoading);
export const contract = createSelector(Web3State, ({ contract }: State): Contract | null => contract);
export const ethereum = createSelector(Web3State, ({ ethereum }: State): MetaMaskInpageProvider | null => ethereum);
export const provider = createSelector(Web3State, ({ provider }: State): providers.Web3Provider | null => provider);

import { NFT } from '@home/models/nft.model';
import { HomeState, HomeFeatureKey } from '@store/home/home.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const homeState = createFeatureSelector<HomeState>(HomeFeatureKey);

export const nftList = createSelector(homeState, ({ nftList }: HomeState): NFT[] | null => nftList);
export const isNftListLoading = createSelector(homeState, ({ isLoading }: HomeState): boolean => isLoading);

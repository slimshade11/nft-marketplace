import { NFT } from '@home/models/nft.model';
import { State, FeatureKey } from '@store/home/home.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const HomeState = createFeatureSelector<State>(FeatureKey);

export const nftList = createSelector(HomeState, ({ nftList }: State): NFT[] | null => nftList);

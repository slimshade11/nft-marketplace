import { NFT } from '@home/models/nft.model';
import { State as HomeState, FeatureKey } from '@store/home/home.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const HomeStateSelector = createFeatureSelector<HomeState>(FeatureKey);

export const nftList = createSelector(HomeStateSelector, ({ nftList }: HomeState): NFT[] | null => nftList);

import { NFTMeta } from '@common/web3/models/nft-meta.model';
import { State as HomeState, FeatureKey } from '@store/home/home.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const HomeStateSelector = createFeatureSelector<HomeState>(FeatureKey);

export const nftList = createSelector(HomeStateSelector, ({ nftList }: HomeState): NFTMeta[] | null => nftList);

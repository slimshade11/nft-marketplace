import { HomeActions } from '@store/home';
import { NFTMeta } from '@common/web3/models/nft-meta.model';
import { createReducer, on } from '@ngrx/store';

export const FeatureKey = 'home';

export interface State {
  nftList: NFTMeta[] | null;
  isLoading: boolean;
}

const initialState: State = {
  nftList: null,
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,
  on(HomeActions.getNftList, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(HomeActions.getNftListSuccess, (state, { nftList }): State => {
    return { ...state, isLoading: false, nftList };
  }),
  on(HomeActions.getNftListFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);

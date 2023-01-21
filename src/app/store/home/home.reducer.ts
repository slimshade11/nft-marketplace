import { HomeActions } from '@app/store/home';
import { NFT } from '@home/models/nft.model';
import { createReducer, on } from '@ngrx/store';

export const HomeFeatureKey = 'home';

export interface HomeState {
  nftList: NFT[] | null;
  isLoading: boolean;
}

const initialState: HomeState = {
  nftList: null,
  isLoading: false,
};

export const HomeReducer = createReducer(
  initialState,
  on(HomeActions.getNftList, (state): HomeState => {
    return { ...state, isLoading: true };
  }),
  on(HomeActions.getNftListSuccess, (state, { nftList }): HomeState => {
    return { ...state, isLoading: false, nftList };
  }),
  on(HomeActions.getNftListFailure, (state): HomeState => {
    return { ...state, isLoading: false };
  })
);

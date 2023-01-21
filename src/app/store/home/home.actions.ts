import { HomeActionTypes } from '@store/home/home-action-types';
import { createAction, props } from '@ngrx/store';
import { NFT } from '@home/models/nft.model';

export const getNftList = createAction(HomeActionTypes.GET_NFT_LIST);
export const getNftListSuccess = createAction(HomeActionTypes.GET_NFT_LIST_SUCCESS, props<{ nftList: NFT[] }>());
export const getNftListFailure = createAction(HomeActionTypes.GET_NFT_LIST_FAILURE);

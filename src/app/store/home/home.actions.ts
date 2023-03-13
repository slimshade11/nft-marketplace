import { HomeActionTypes } from '@store/home/home-action-types';
import { createAction, props } from '@ngrx/store';
import { NFTMeta } from '@common/web3/models/nft-meta.model';

export const getNftList = createAction(HomeActionTypes.GET_NFT_LIST);
export const getNftListSuccess = createAction(HomeActionTypes.GET_NFT_LIST_SUCCESS, props<{ nftList: NFTMeta[] }>());
export const getNftListFailure = createAction(HomeActionTypes.GET_NFT_LIST_FAILURE);

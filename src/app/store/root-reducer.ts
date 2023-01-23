import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as homeStore from '@store/home';
import * as web3Store from '@store/web3';

export interface AppState {
  [homeStore.FeatureKey]: homeStore.State;
  [web3Store.FeatureKey]: web3Store.State;
}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: () => ({
    [homeStore.FeatureKey]: homeStore.Reducer,
    [web3Store.FeatureKey]: web3Store.Reducer,
  }),
});

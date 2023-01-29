import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as fromHome from '@store/home';
import * as fromWeb3 from '@store/web3';

export interface AppState {
  [fromHome.FeatureKey]: fromHome.State;
  [fromWeb3.FeatureKey]: fromWeb3.State;
}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: () => ({
    [fromHome.FeatureKey]: fromHome.Reducer,
    [fromWeb3.FeatureKey]: fromWeb3.Reducer,
  }),
});

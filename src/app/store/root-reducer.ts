import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as homeStore from '@store/home';

export interface AppState {
  [homeStore.HomeFeatureKey]: homeStore.HomeState;
}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: () => ({
    [homeStore.HomeFeatureKey]: homeStore.HomeReducer,
  }),
});

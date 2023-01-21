import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {}

export const ROOT_REDUCER_TOKEN: string = 'Root reducers token';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(ROOT_REDUCER_TOKEN, {
  factory: () => ({}),
});

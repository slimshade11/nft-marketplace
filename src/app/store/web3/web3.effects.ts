import { createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';

@Injectable()
export class Web3Effects {
  createDefaultState$ = createEffect(() => {
    return this.appFacade.createDefaultStateEffect$();
  });

  constructor(private appFacade: AppFacade) {}
}

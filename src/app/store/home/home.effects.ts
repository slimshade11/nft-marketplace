import { Injectable } from '@angular/core';
import { HomeFacade } from '@home/home.facade';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class HomeEffects {
  getNftList$ = createEffect(() => {
    return this.homeFacade.getNftListEffect$();
  });

  constructor(private homeFacade: HomeFacade) {}
}

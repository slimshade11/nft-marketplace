import { CreateNftFormService } from '@home/services/create-nft-form.service';
import { HomeService } from '@home/services/home.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { HomeActions, HomeSelectors } from '@store/home';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { NFT } from '@home/models/nft.model';
import { FormGroup } from '@angular/forms';
import { CreateNftForm } from '@home/models/create-nft-form.model';

@Injectable()
export class HomeFacade {
  constructor(
    private homeService: HomeService,
    private actions$: Actions,
    private store: Store,
    private createNftFormService: CreateNftFormService
  ) {}

  public getCreateNftForm$(): Observable<FormGroup<CreateNftForm>> {
    this.createNftFormService.buildForm();
    return this.createNftFormService.getForm$();
  }

  public dispatchGetNftListAction(): void {
    this.store.dispatch(HomeActions.getNftList());
  }

  public selectNftList$(): Observable<NFT[] | null> {
    return this.store.select(HomeSelectors.nftList);
  }
}

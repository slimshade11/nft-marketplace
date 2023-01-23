import { Component, OnInit } from '@angular/core';
import { CreateNftForm } from '@home/models/create-nft-form.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeFacade } from '@home/home.facade';

@Component({
  selector: 'nftm-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss'],
})
export class NftComponent {
  form$: Observable<FormGroup<CreateNftForm>> = this.homeFacade.getCreateNftForm$();

  constructor(private homeFacade: HomeFacade) {}

  public onNftUpload(event: any): void {
    // console.log(event);
  }

  public onSubmit(form: FormGroup<CreateNftForm>): void {
    if (!form.valid) {
      form.markAsPristine();
      return;
    }
  }
}

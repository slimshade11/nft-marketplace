import { Component } from '@angular/core';
import { CreateNftForm } from '@home/models/create-nft-form.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeFacade } from '@home/home.facade';

@Component({
  selector: 'nft-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss'],
})
export class NftComponent {
  form$: Observable<FormGroup<CreateNftForm>> = this.homeFacade.getCreateNftForm$();

  constructor(private homeFacade: HomeFacade) {}

  public onNftUpload(event: any): void {}

  public onSubmit(form: FormGroup<CreateNftForm>): void {
    if (!form.valid) {
      form.markAsPristine();
      return;
    }
  }
}

import { CreateNftFormService } from '@home/services/create-nft-form.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CreateNftForm } from '@home/models/create-nft-form.model';

@Injectable({ providedIn: 'root' })
export class HomeFacade {
  constructor(private createNftFormService: CreateNftFormService) {}

  public getCreateNftForm$(): Observable<FormGroup<CreateNftForm>> {
    this.createNftFormService.buildForm();
    return this.createNftFormService.form$;
  }
}

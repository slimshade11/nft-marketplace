import { CreateNftForm } from '@home/models/create-nft-form.model';
import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormService } from '@common/services/form.service';

@Injectable({ providedIn: 'root' })
export class CreateNftFormService extends FormService {
  constructor() {
    super();
  }

  public get formConfig(): FormGroup<CreateNftForm> {
    return this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      coverPhoto: ['', [Validators.required]],
      health: ['', [Validators.required]],
      attack: ['', [Validators.required]],
      speed: ['', [Validators.required]],
    }) as FormGroup<CreateNftForm>;
  }
}

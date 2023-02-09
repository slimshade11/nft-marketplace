import { FormControl } from '@angular/forms';

export interface CreateNftForm {
  name: FormControl<string>;
  description: FormControl<string>;
  coverPhoto: FormControl<string>;
  health: FormControl<string>;
  attack: FormControl<string>;
  speed: FormControl<string>;
}

import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[strongPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: StrongPasswordDirective,
      multi: true,
    },
  ],
})
export class StrongPasswordDirective implements Validator {
  public constructor() {}

  public validate(control: AbstractControl): ValidationErrors | null {
    return null
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/.test(
      control.value
    )
      ? null
      : { strongPassword: false };
  }
}

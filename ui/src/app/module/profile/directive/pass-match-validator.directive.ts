import { Directive } from '@angular/core';
import {
  ValidationErrors,
  Validators,
  AbstractControl,
  NG_VALIDATORS,
} from '@angular/forms';

@Directive({
  selector: '[passMatchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PassMatchValidatorDirective,
      multi: true,
    },
  ],
})
export class PassMatchValidatorDirective implements Validators {
  public constructor() {}

  public validate(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirm-password')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}

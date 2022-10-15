import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  {
    let pass = group.get('first')!.value;
    let confirmPass = group.get('second')!.value;
    return pass === confirmPass ? null : { notSame: true };
  }
};

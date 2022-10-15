import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
export const passoutValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  {
    let birthYear: number = new Date(group.get('dob')?.value).getFullYear();
    let sslcPassoutYear: number = parseInt(
      (group.get('educationDetails') as FormArray).controls[0]?.get('passout')
        ?.value as any,
      10
    );
    let hscPassoutYear = parseInt(
      (group.get('educationDetails') as FormArray).controls[1]?.get('passout')
        ?.value as any,
      10
    );

    if (birthYear > sslcPassoutYear - 15) {
      return { invalidPassout1: true };
    }

    if (sslcPassoutYear > hscPassoutYear - 2) {
      return { invalidPassout2: true };
    }
    for (
      let i = 2;
      i < (group.get('educationDetails') as FormArray)?.length;
      i++
    ) {
      if (
        hscPassoutYear >
        parseInt(
          (group.get('educationDetails') as FormArray)?.controls[i]?.get(
            'passout'
          )?.value,
          10
        ) -
          3
      ) {
        let invalidPassout: any = {};
        invalidPassout[i] = true;
        return { invalidPassout: invalidPassout };
      }
    }
    return null;
  }
};

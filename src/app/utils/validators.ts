import {
    AbstractControl,
    FormArray,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export function formArrayAllRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control instanceof FormArray && control.length >= 0) {
            const emptyCtrl = control.controls.find(c => c.value === '');
            if (emptyCtrl) {
                return { allRequired: true };
            }
            return null;
        }

        return null;
    };
}

export function imageUrlValidator(): ValidatorFn {
  const imageUrlPattern = /\.(jpg|jpeg|png|)$/i;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && imageUrlPattern.test(value)) {
      return null;
    }
    return { 'invalidImageUrl': { value } };
  };
}

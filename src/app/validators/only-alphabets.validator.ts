import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyAlphabetsValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const regex = /^[a-zA-Z ]*$/;
  if (value && !regex.test(value)) {
    return { onlyAlphabets: true };
  }
  return null;
}
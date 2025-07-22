import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyAlphabetsValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const regex = /^[A-Za-z ]*$/;
    const isAsciiOnly = /^[\x00-\x7F]*$/.test(value);
  if (value && !regex.test(value) || !isAsciiOnly) {
    return { onlyAlphabets: true };
  }
  return null;
}
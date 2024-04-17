import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regularExp: RegExp = EMAIL_REGEX;
  let cValue = control.value;
  cValue = (cValue || '').toString().trim();
  if (!cValue)
    return { required: true };
  return regularExp.test(cValue) ? null : {
    invalidEmail: true
  };
};

export const spaceNotAllowed: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if ((control.value as string)?.indexOf(' ') >= 0) {
    return { space: true }
  }
  return null;
}
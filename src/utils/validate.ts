import {localeString} from './i18n';

const REGEX = {
  NUMERIC: /[^0-9]/i,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  ALPHA_NUMERIC: /(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]|[@]*$/i,
};

/**
 * 10 digit phone number validation
 * @param {*} value
 */

export const required = value =>
  value ? undefined : localeString('validationMessages.required');

export const minLength = min => value =>
  value && value.length < min
    ? min === 16
      ? localeString('validationMessages.invalidCardDetails')
      : localeString('validationMessages.minError', {min: min})
    : undefined;

export const maxLength = max => value =>
  value && value.length > max
    ? localeString('validationMessages.maxError', {max: max})
    : undefined;

export const minLength2 = minLength(2);
export const minLength8 = minLength(8);
export const minLength3 = minLength(3);
export const maxLength16 = maxLength(16);
export const maxLength3 = maxLength(3);
export const maxLength6 = maxLength(6);
export const maxLength8 = maxLength(8);

/**
 *
 * @param value : number : positive number validation
 */
export const numeric = (value: number) => {
  value.replace(/,/g, '');
  value && REGEX.NUMERIC.test(value)
    ? localeString('validationMessages.positiveNumber')
    : undefined;
};

/**
 *
 * @param value : number : number with length===10
 */
export const length10 = (value: number) => {
  value.replace(/,/g, '');
  value &&
    (value.length !== 10
      ? localeString('validationMessages.length10')
      : undefined);
};

/**
 *
 * @param value : string : email
 */
export const email = (value: string) =>
  value && !REGEX.EMAIL.test(value)
    ? localeString('validationMessages.invalidEmail')
    : undefined;

/**
 *
 * @param value : any : to validate alpha numeric values
 */
export const alphaNumeric = (value: any) =>
  value && !REGEX.ALPHA_NUMERIC.test(value)
    ? localeString('validationMessages.alphaNumberic')
    : undefined;

export const yearRange = (value: any) =>
  value && value < 35
    ? undefined
    : localeString('validationMessages.yearRange');

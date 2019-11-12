import {localeString} from './i18n';
import {LOCALE_STRING} from './constants';

const MORTGAGE_LIMIT = 10000000,
  MONTHLY_MORTGAGE_LIMIT = 10000;

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
  value ? undefined : localeString(LOCALE_STRING.VALIDATIONS.IS_REQUIRED);

export const minLength = min => value =>
  value && value.length < min
    ? min === 16
      ? localeString(LOCALE_STRING.VALIDATIONS.INVALID_CARD_DETAILS)
      : localeString(LOCALE_STRING.VALIDATIONS.MIN_ERROR, {min: min})
    : undefined;

export const maxLength = max => value =>
  value && value.length > max
    ? localeString(LOCALE_STRING.VALIDATIONS.MAX_ERROR, {max: max})
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
export const numeric = (value: any) => {
  const withoutCommas = value.replace(/,/g, '');
  if (Number(withoutCommas) === 0)
    return localeString(LOCALE_STRING.VALIDATIONS.POSITIVE_NUMBER);
  else
    return withoutCommas && REGEX.NUMERIC.test(withoutCommas)
      ? localeString(LOCALE_STRING.VALIDATIONS.POSITIVE_NUMBER)
      : undefined;
};
/**
 *
 * @param value : number : number with length===10
 */

export const maxLimitMortgage = (value: any) => {
  const withoutCommas = value.replace(/,/g, '');
  if (withoutCommas > MORTGAGE_LIMIT)
    return localeString(LOCALE_STRING.VALIDATIONS.MORTGAGE_LIMIT);
  else return undefined;
};

export const maxLimitMonthlyMortgage = (value: any) => {
  const withoutCommas = value.replace(/,/g, '');
  if (withoutCommas > MONTHLY_MORTGAGE_LIMIT)
    return localeString(LOCALE_STRING.VALIDATIONS.MONTHLY_MORTGAGE_LIMIT);
  else return undefined;
};

export const length10 = (value: number) => {
  value &&
    (value.length !== 10
      ? localeString(LOCALE_STRING.VALIDATIONS.LENGTH_TEN)
      : undefined);
};

/**
 *
 * @param value : string : email
 */
export const email = (value: string) =>
  value && !REGEX.EMAIL.test(value)
    ? localeString(LOCALE_STRING.VALIDATIONS.INVALID_EMAIL)
    : undefined;

/**
 *
 * @param value : any : to validate alpha numeric values
 */
export const alphaNumeric = (value: any) =>
  value && !REGEX.ALPHA_NUMERIC.test(value)
    ? localeString(LOCALE_STRING.VALIDATIONS.ALPHA_NUMERIC)
    : undefined;

export const yearRange = (value: any) =>
  value && value > 0 && value < 35
    ? undefined
    : localeString(LOCALE_STRING.VALIDATIONS.YEAR_RANGE);

import {localeString} from './i18n';
import {connect} from 'react-redux';
import {LOCALE_STRING, DB_KEYS} from '../utils';
import {store} from '../store/configStore';
import {get as _get} from 'lodash';
import Moment from 'moment';

const MORTGAGE_LIMIT = 10000000,
  MONTHLY_MORTGAGE_LIMIT = 10000,
  MINIMUM_AGE_CRITERION = 18,
  MAX_AGE_CRITERION = 1900;

const REGEX = {
  NUMERIC: /[^0-9]/i,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  ALPHA_NUMERIC: /(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]|[@]*$/i,
  ALPHABETS_WITH_SPACES: /^[a-zA-Z ]*$/,
  DATE_OF_BIRTH: /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/,
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

export const noWhiteSpaces = (value: string) =>
  value && value.includes(' ')
    ? localeString(LOCALE_STRING.VALIDATIONS.WHITE_SPACES)
    : undefined;
/**
 *
 * @param value : any : to validate alpha numeric values
 */
export const alphaNumeric = (value: any) =>
  value && !REGEX.ALPHA_NUMERIC.test(value)
    ? localeString(LOCALE_STRING.VALIDATIONS.ALPHA_NUMERIC)
    : undefined;
/**
 *
 * @param value : any : to validate alphaBets values
 */
export const alphaBets = (value: any) =>
  value && !REGEX.ALPHABETS_WITH_SPACES.test(value)
    ? localeString(LOCALE_STRING.VALIDATIONS.APLHABETS_WITH_SPACES)
    : undefined;

export const yearRange = (value: any) =>
  value && value > 0 && value < 35
    ? undefined
    : localeString(LOCALE_STRING.VALIDATIONS.YEAR_RANGE);

/**
 * @param value : string : Validation WRT mortgageAmount & mortgageTer
 */
export const negativeValidation = (value: any) => {
  const reducerResponse = store.getState().form;
  const monthlyMortgage = Number(
    _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT, '').replace(
      /,/g,
      '',
    ),
  );
  const timePeriod = Number(
    _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_TIMEPERIOD, '').replace(
      /,/g,
      '',
    ),
  );
  const withoutCommas = value.replace(/,/g, '');
  const thresholdMonthlyLimit = monthlyMortgage / (timePeriod * 12);
  return value && thresholdMonthlyLimit > Number(withoutCommas)
    ? localeString(LOCALE_STRING.MORTGAGE_INPUT_DATA.INVALID_AMOUNT)
    : undefined;
};
/**
 *
 * @param value : string : Date of Birth
 * Validation of DOB entered by User
 */
export const dobValidation = (value: string) => {
  let birthYear = Moment(value, 'DD/MM/YYYY').year();
  let currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return value && !REGEX.DATE_OF_BIRTH.test(value)
    ? localeString(LOCALE_STRING.VALIDATIONS.INVALID_DOB)
    : age >= MINIMUM_AGE_CRITERION
    ? undefined
    : localeString(LOCALE_STRING.VALIDATIONS.MINIMUM_REQ_AGE);
};
/**
 *
 * @param value : string : Date of Birth
 * Validation of DOB for maximum age allowed
 */
export const maxAgeCritereon = (value: string) => {
  let birthYear = Moment(value, 'DD/MM/YYYY').year();
  return value && birthYear < MAX_AGE_CRITERION
    ? localeString(LOCALE_STRING.VALIDATIONS.MAX_AGE_LIMIT)
    : undefined;
};
/**
 * @param value : string : Validation for email matching
 */
export const emailMatching = (value: any) => {
  const reducerResponse = store.getState().form;
  const previousPassword = _get(
    reducerResponse,
    DB_KEYS.RESET_PASSWORD_FORM,
    '',
  );
  return value && previousPassword !== value
    ? localeString(LOCALE_STRING.VALIDATIONS.PASSWORD_NOT_MATCHED)
    : undefined;
};
/**
 * @param value : string : Validation for email matching
 */
export const passMatching = (value: any) => {
  const reducerResponse = store.getState().form;
  const previousPassword = _get(
    reducerResponse,
    DB_KEYS.UPDATE_PASSWORD_FORM,
    '',
  );
  return value && previousPassword !== value
    ? localeString(LOCALE_STRING.VALIDATIONS.PASSWORD_NOT_MATCHED)
    : undefined;
};

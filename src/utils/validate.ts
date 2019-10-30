/**
 * 10 digit phone number validation
 * @param {*} value
 */

export const required = value => (value ? undefined : 'Required');

export const minLength = min => value =>
  value && value.length < min
    ? min === 16
      ? 'Invalid card details'
      : `Must be ${min} characters or more`
    : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength2 = minLength(2);
export const minLength8 = minLength(8);
export const minLength3 = minLength(3);
export const maxLength16 = maxLength(16);
export const maxLength3 = maxLength(3);
export const maxLength6 = maxLength(6);

export const length10 = (value: any) =>
  value && (value.length !== 10 ? 'Must be 10 characters' : undefined);

export const email = (value: any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
export const alphaNumeric = value =>
  value && !/(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]|[@]*$/i.test(value)
    ? 'Atleast one character and one number'
    : undefined;

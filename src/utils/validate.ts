/**
 * 10 digit phone number validation
 * @param {*} value
 */
export const length10 = (value: any) =>
  value && (value.length !== 10 ? 'Must be 10 characters' : undefined);

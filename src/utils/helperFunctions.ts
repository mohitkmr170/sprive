import * as Keychain from 'react-native-keychain';
import Snackbar from 'react-native-snackbar';
import {get as _get} from 'lodash';
import {COLOR} from '../utils/colors';
import {change} from 'redux-form';
import {store} from '../store/configStore';
import {APP_LEVEL_REQUIRES} from '../utils';
import {APP_CONSTANTS, DB_KEYS, LOCAL_KEYS, NUMERIC_FACTORS} from './constants';

/**
 * Funtion to get password strength(out of 4)
 * @param password : string : password to check strength
 */

export async function getPasswordStrength(password: string) {
  let zxcvbn = APP_LEVEL_REQUIRES.zxcvbn;
  try {
    let passStrength = await zxcvbn(password);
    console.log('getPasswordStrength : passStrength =>', passStrength.score);
    let strengthMessage = '';
    switch (passStrength.score) {
      case 1:
        strengthMessage = 'Weak';
        break;
      case 2:
        strengthMessage = 'Fair';
        break;
      case 3:
        strengthMessage = 'Good';
        break;
      case 4:
        strengthMessage = 'Strong';
        break;
      default:
        strengthMessage = '';
    }
    return new Promise((resolve, reject) => {
      if (strengthMessage) {
        resolve(strengthMessage);
      } else reject(null);
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Funtion to get password stregnth percentage
 * @param passwordMessage : string
 */

export function checkPassMessagePercentage(passwordMessage: string) {
  let passPercent = 0;
  switch (passwordMessage) {
    case 'Too Short':
      passPercent = 0.25;
      break;
    case 'Fair':
      passPercent = 0.5;
      break;
    case 'Good':
      passPercent = 0.75;
      break;
    case 'Strong':
      passPercent = 1;
      break;
    default:
      passPercent = 0;
  }
  return passPercent;
}

/**
 * Funtion to SET user authToken
 * @param token : string : user auth token
 * @param email : string : corresponding email of user
 */
export async function setAuthToken(token: string, email: string) {
  return new Promise((resolve, reject) => {
    const authToken = token;
    const userEmail = email;
    Keychain.setGenericPassword(userEmail, authToken)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

/*
TODO : Provide return type of functions
*/

/**
 * Funtion to GET user authToken
 */
export async function getAuthToken() {
  return new Promise((resolve, reject) => {
    const userAuthToken = Keychain.getGenericPassword()
      .then(response => resolve(response.password))
      .catch(error => reject(Error));
  });
}

/**
 * Funtion to clear and reset user authToken
 */
export async function resetAuthToken() {
  return new Promise((resolve, reject) => {
    Keychain.resetGenericPassword()
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

/**
 * Common wrapper function to show Snackbar
 * @param err : object : Error object of API error
 */
export function showSnackBar(err: object, nonApiError?: string, type?: string) {
  let priorityErrorMessage = '';
  if (Object.keys(err).length) {
    let key = Object.keys(_get(err, DB_KEYS.SNACKBAR_ERRORS, ''))[0];
    priorityErrorMessage = _get(err, DB_KEYS.SNACKBAR_ERRORS, '')[key];
  }

  return Snackbar.show({
    title: nonApiError
      ? nonApiError
      : type === APP_CONSTANTS.SCREEN_TYPE_FORM
      ? _get(err, DB_KEYS.ERROR_MESSAGE, APP_CONSTANTS.GENERAL_ERROR)
      : _get(err, DB_KEYS.ERROR_MESSAGE, APP_CONSTANTS.GENERAL_ERROR) +
        priorityErrorMessage,
    duration: Snackbar.LENGTH_LONG,
    action: {
      title: 'OK', //For any button title
      color: COLOR.SLIDER_COLOR,
      onPress: () => {
        /* Do something. */
      },
    },
  });
}

/**
 * Function to get number with UK comma separation conventions
 * @param data : number : Number to be converted as per UK Conventions
 */
export function getNumberWithCommas(data: string) {
  return data && data.toString()
    ? data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : data;
}

/**
 *
 * @param data : number : I/P number to be rounded off
 */
export function getRoundFigure(data: number) {
  return Math.round(data);
}

/*
NOTES : These percentage range will be obtained from Backend API
*/

/**
 * Function to get color_coding based on task_completion_percentage range
 * @param percentage : number : Pending task completion percentage
 */
export function getPendingTaskColorCode(percentage: number) {
  if (percentage >= 0 && percentage < 20) return COLOR.SALMON_RED;
  else if (percentage >= 20 && percentage < 80) return COLOR.AMBER;
  else if (percentage >= 80 && percentage < 100) return COLOR.LIGHT_GREEN;
  else return COLOR.WHITE;
}
/*
  NOTES : This function can be moved to helper functions
  */
export function mapFormValues(
  formName: string,
  formField: string,
  fieldValue: string,
) {
  store.dispatch(change(formName, formField, fieldValue));
}

/**
 * Function to retrieve start_percentage, end_percentage and progress_Percentage for current_LTV
 * @param currentLtv : number : current LTV percentage
 */
export function getLtvRangeAndPercentage(currentLtv: number) {
  let ltv_mod_val = currentLtv % NUMERIC_FACTORS.LTV_FRACTION_OFFSET;
  let start_percentage_val = currentLtv - ltv_mod_val;
  let end_percentage_val =
    start_percentage_val + NUMERIC_FACTORS.LTV_FRACTION_OFFSET;
  let progress_percentage = ltv_mod_val / NUMERIC_FACTORS.LTV_FRACTION_OFFSET;
  return {
    startVal: start_percentage_val + ' %',
    endVal: end_percentage_val + ' %',
    percentage: progress_percentage,
  };
}

import * as Keychain from 'react-native-keychain';

/**
 * Funtion to get password strength(out of 4)
 * @param password : string : password to check strength
 */

export async function getPasswordStrength(password: string) {
  let zxcvbn = require('zxcvbn');
  try {
    let passStrength = await zxcvbn(password);
    console.log('getPasswordStrength : passStrength =>', passStrength.score);
    let strengthMessage = '';
    switch (passStrength.score) {
      case 1:
        strengthMessage = 'Too Short';
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
  try {
    const authToken = token;
    const userEmail = email;
    await Keychain.setGenericPassword(userEmail, authToken);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Funtion to GET user authToken
 */
export async function getAuthToken() {
  try {
    const userAuthToken = await Keychain.getGenericPassword();
    console.log('asiudgasds', userAuthToken);
    const authToken = userAuthToken;
    return authToken.password;
  } catch (error) {
    return;
  }
}

/**
 * Funtion to clear and reset user authToken
 */
export async function resetAuthToken() {
  try {
    await Keychain.resetGenericPassword()
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  } catch (error) {
    console.error(error);
  }
}

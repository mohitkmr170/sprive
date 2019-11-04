/**
 *
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
      if (strengthMessage !== '') {
        resolve(strengthMessage);
      } else reject(null);
    });
  } catch (err) {
    console.log(err);
  }
}

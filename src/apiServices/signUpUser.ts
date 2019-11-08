import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

/**
 * Auth SignUp
 * @param body : object : payload for POST api call
 */

export function signUpUser(body: object) {
  const endPoint = apiConstants.API_END_POINTS.SIGNUP;
  return postRequest(endPoint, body);
}

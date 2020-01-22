import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.SIGNUP;
/**
 * Auth SignUp
 * @param body : object : payload for POST api call
 */

export function signUpUser(body: object) {
  return postRequest(endPoint, body);
}

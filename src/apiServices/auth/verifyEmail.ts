import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.VERIFY_EMAIL;
/**
 * Auth SignUp
 * @param body : object : payload for POST api call
 */

export function verifyEmail(body: object) {
  return postRequest(endPoint, body);
}

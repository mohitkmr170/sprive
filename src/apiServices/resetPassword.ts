import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.RESET_PASSWORD;
/**
 * Auth SignUp
 * @param body : object : payload for POST api call
 */

export function resetPassword(body: object) {
  return postRequest(endPoint, body);
}

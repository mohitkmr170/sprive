import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.RESET_PASSWORD_LINK;
/**
 * Auth SignUp
 * @param body : object : payload for POST api call
 */

export function resetPasswordLink(body: object) {
  return postRequest(endPoint, body);
}

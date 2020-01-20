import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.RESET_PASSWORD;
/**
 * Update password
 * @param body : object : payload for POST api call
 */

export function updatePassword(body: object) {
  return postRequest(endPoint, body);
}

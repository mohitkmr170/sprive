import apiConstants from '../../../config/apiConstants';
import {patchRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.RESET_PASSWORD;
/**
 * Update password
 * @param body : object : payload for POST api call
 */

export function updatePassword(body: object, qParam: object) {
  return patchRequest(endPoint, body, qParam);
}

import apiConstants from '../../../config/apiConstants';
import {patchRequest} from '../requestServices';

let endPoint = apiConstants.API_END_POINTS.UPDATE_USER_PROFILE;
/**
 * Update User profile
 * @param body : object : payload for PATCH api call
 */

export function updateUserProfile(body: object, qParam: object) {
  return patchRequest(endPoint, body, qParam);
}

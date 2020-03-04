import apiConstants from '../../../config/apiConstants';
import {putRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.GET_USER_ADDRESS;

/**
 * Update User address
 * @param body : object : payload for PUT api call
 */

export function updateUserAddress(body: object, qParam: object) {
  return putRequest(endPoint, body, qParam);
}

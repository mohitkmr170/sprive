import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.GET_USER_ADDRESS;

/**
 * Get User Address
 * @param body : object : payload for GET api call
 */

export function getUserAddress(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

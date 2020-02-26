import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.GET_ADDRESS;

/**
 * Get Address API call
 * @param body : object : payload for GET api call
 */

export function getAddress(body: object) {
  return postRequest(endPoint, body);
}

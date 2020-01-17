import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.GET_USER_INFO;
/**
 * Validate token to getUser details
 * @param body : object : payload for POST api call
 */

export function getUserInfo() {
  return postRequest(endPoint);
}

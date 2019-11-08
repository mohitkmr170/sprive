import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

/**
 * Validate token to getUser details
 * @param body : object : payload for POST api call
 */

export function getUserInfo() {
  const endPoint = apiConstants.API_END_POINTS.GET_USER_INFO;
  return postRequest(endPoint);
}

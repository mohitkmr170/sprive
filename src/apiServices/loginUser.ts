import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

/**
 * Auth Login
 * @param body : object : payload for POST api call
 */

export function loginUser(body: object) {
  const endPoint = apiConstants.API_END_POINTS.LOGIN;
  return postRequest(endPoint, body);
}

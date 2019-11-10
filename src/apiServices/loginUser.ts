import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.LOGIN;
/**
 * Auth Login
 * @param body : object : payload for POST api call
 */
export function loginUser(body: object) {
  return postRequest(endPoint, body);
}

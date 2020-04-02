import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.PIN_AUTH;
/**
 * PIN Auth Login
 * @param body : object : payload for POST api call
 */
export function setUserAuthPin(body: object) {
  return postRequest(endPoint, body);
}

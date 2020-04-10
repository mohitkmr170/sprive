import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.VERIFY_PIN;
/**
 * PIN Auth Verify
 * @param body : object : payload for POST api call
 */
export function verifyUserPin(body: object) {
  return postRequest(endPoint, body);
}

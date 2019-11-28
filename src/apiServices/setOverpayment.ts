import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.OVERPAYMENT;

/**
 * Set Mortgage data to corresponding user
 * @param body : object : payload for POST api call
 */

export function setOverpayment(body: object) {
  return postRequest(endPoint, body);
}

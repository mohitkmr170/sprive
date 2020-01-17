import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.OVERPAYMENT;
/**
 * Get user Mortgage data
 * @param body : object : payload for GET api call
 */

export function getOverpaymentHistory(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

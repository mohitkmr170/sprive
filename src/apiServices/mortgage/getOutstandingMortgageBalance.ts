import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestServices';
import {get as _get} from 'lodash';

const endPoint = apiConstants.API_END_POINTS.OUTSTANDING_MORTGAGE_BALABCE;

/**
 * Get outstanding user Mortgage balance
 * @param body : object : payload for GET api call
 */

export function getOutstandingMortgageBalance(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

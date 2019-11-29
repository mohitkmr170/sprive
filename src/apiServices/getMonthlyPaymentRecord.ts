import apiConstants from '../../config/apiConstants';
import {getRequest} from './requestServices';
import {get as _get} from 'lodash';

const endPoint = apiConstants.API_END_POINTS.GET_GRAPH_DATA;
/**
 * Get user Mortgage data
 * @param body : object : payload for GET api call
 */

export function getMonthlyPaymentRecord(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

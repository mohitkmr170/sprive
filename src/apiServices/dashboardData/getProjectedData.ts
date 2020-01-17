import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestServices';
import {get as _get} from 'lodash';

const endPoint = apiConstants.API_END_POINTS.GET_PROJECTED_DATA;
/**
 * Get user Mortgage data
 * @param body : object : payload for GET api call
 */

export function getProjectedData(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

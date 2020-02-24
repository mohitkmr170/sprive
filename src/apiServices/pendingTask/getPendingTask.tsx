import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestServices';
import {get as _get} from 'lodash';

const endPoint = apiConstants.API_END_POINTS.PENDING_TASK;

/**
 * Get Pending Task
 * @param body : object : payload for GET api call
 */

export function getPendingTask(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

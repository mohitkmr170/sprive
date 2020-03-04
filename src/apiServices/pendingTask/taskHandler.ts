import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.TASK_HANDLER;

/**
 * Task handler API
 * @param body : object : payload for POST api call
 */

export function taskHandler(body: object) {
  return postRequest(endPoint, body);
}

import apiConstants from '../../../config/apiConstants';
import {patchRequest} from '../requestServices';

let endPoint = apiConstants.API_END_POINTS.NOTIFICATIONS;
/**
 * Dismiss single notification
 * @param body : object : payload for PATCH api call
 */

export function dismissSingleNotification(body: object, qParam: object) {
  return patchRequest(endPoint, body, qParam);
}

import apiConstants from '../../../config/apiConstants';
import {patchRequest} from '../requestServices';

let endPoint = apiConstants.API_END_POINTS.NOTIFICATIONS;
/**
 * Dismiss all notifications
 * @param body : object : payload for PATCH api call
 */

export function dismissAllNotifications(body: object, qParam: object) {
  return patchRequest(endPoint, body, qParam);
}

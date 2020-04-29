import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.NOTIFICATIONS;
/**
 * Get all notifications for a user
 * @param body : object : payload for GET api call
 */

export function getAllNotifications(body: object, qParam: object) {
  return getRequest(endPoint, body, qParam);
}

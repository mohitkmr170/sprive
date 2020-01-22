import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.PUSH_NOTIFICATION;

/**
 * One signal push notification
 * @param body : object : payload for POST api call
 */

export function pushNotification() {
  return postRequest(endPoint);
}

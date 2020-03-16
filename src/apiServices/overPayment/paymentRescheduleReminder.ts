import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.PAYMENT_SCHEDULE_REMINDER;

/**
 * Reschedule Payment reminder
 * @param body : object : payload for POST api call
 */

export function paymentRescheduleReminder(body: object, qParams: object) {
  return postRequest(endPoint, body, qParams);
}

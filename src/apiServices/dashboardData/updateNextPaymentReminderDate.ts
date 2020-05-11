import apiConstants from '../../../config/apiConstants';
import {patchRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.GET_GRAPH_DATA;
/**
 * Update next payment reminder
 * @param body : object : payload for PATCH api call
 */

export function updateNextPaymentReminderDate(body: object, qParam: object) {
  return patchRequest(endPoint, body, qParam);
}

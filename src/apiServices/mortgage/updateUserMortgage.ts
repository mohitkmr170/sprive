import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

const endPoint = apiConstants.API_END_POINTS.UPDATE_MORTGAGE;

/**
 * Set Mortgage data to corresponding user
 * @param body : object : payload for POST api call
 */

export function updateUserMortgage(body: object, qParam: object) {
  return postRequest(endPoint, body, qParam);
}

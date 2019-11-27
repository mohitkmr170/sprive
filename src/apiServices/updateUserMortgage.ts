import apiConstants from '../../config/apiConstants';
import {putRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.USER_MORTGAGE;

/**
 * Set Mortgage data to corresponding user
 * @param body : object : payload for POST api call
 */

export function updateUserMortgage(body: object, qParam: object) {
  return putRequest(endPoint, body, qParam);
}

import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.USER_MORTGAGE;

/**
 * Set Mortgage data to corresponding user
 * @param body : object : payload for POST api call
 */

export function setUserMortgage(body: object) {
  return postRequest(endPoint, body);
}

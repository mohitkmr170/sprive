import apiConstants from '../../config/apiConstants';
import {postRequest} from './requestServices';

const endPoint = apiConstants.API_END_POINTS.GOAL;

/**
 * Set Mortgage data to corresponding user
 * @param body : object : payload for POST api call
 */

export function setUserGoal(body: object) {
  return postRequest(endPoint, body);
}

import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';
import {get as _get} from 'lodash';

const endPoint = apiConstants.API_END_POINTS.GET_ADDRESS;

/**
 * Get Address using RightMode
 * @param body : object : payload for GET api call
 */

export function getAddress(body: object) {
  return postRequest(endPoint, body);
}

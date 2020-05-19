import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

/**
 * Get Firebase remote config data
 * @param body : object : payload for POST api call
 */

export function getRemoteConfigData(body: object) {
  const endPoint = apiConstants.API_END_POINTS.GET_REMOTE_CONFIG;
  return postRequest(endPoint, body);
}

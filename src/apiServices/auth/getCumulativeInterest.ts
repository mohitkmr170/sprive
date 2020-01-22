import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestServices';

/**
 * Get cumulative interest based on input Mortgage
 * @param body : object : payload for POST api call
 */

export function getCumulativeInterest(body: object) {
  const endPoint = apiConstants.API_END_POINTS.INTEREST_CALCULATOR;
  return postRequest(endPoint, body);
}

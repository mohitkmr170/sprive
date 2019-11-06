import apiConstants from '../../config/apiConstants';
import {getRequest, postRequest} from './requestServices';

/**
 * Dummy Test API to fetch userProfile
 */

export function getCumulativeInterest(body: object) {
  const endPoint = apiConstants.ENDPOINTS.INTEREST_CALCULATOR;
  return postRequest(endPoint, body);
}

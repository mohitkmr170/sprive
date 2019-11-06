import axios from 'axios';
import {url} from '../../config/urlEndPoints';
import apiConstants from '../../config/apiConstants';

/**
 * Function to get complete URL
 * @param endPoint : string
 */
const getCompleteUrl = (endPoint: string) => {
  /*
  TODO : conditions to be added based on the current environment
  */
  const hostUrl = url.localApiUrl;
  return `${hostUrl}/${endPoint}`;
};

/**
 * Funtion to get header
 * @param token : string
 */
const getHeaders = (token: string) => {
  let headers = apiConstants.BASE_HEADER;
  if (token) {
    headers['Authorization'] = token;
    return headers;
  } else return headers;
};

/*
GET request wrapper
*/
export const getRequest = (endPoint: string) => {
  return new Promise((resolve, reject) => {
    const token = '';
    /*
    TODO : token to be accessed through redusStore
    */
    axios
      .get(getCompleteUrl(endPoint), {
        headers: getHeaders(token),
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(console.error(err)));
  });
};

/**
 * POST request wrapper
 */
export const postRequest = (endPoint: string, params: object) => {
  return new Promise((resolve, reject) => {
    const token = '';
    /*
    TODO : token to be accessed through redusStore
    */
    axios
      .post(getCompleteUrl(endPoint), params, {
        headers: getHeaders(token),
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

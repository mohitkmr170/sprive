import axios from 'axios';
import {url} from '../../config/urlEndPoints';
import apiConstants from '../../config/apiConstants';
import {getAuthToken, showSnackBar} from '../utils/helperFunctions';
import {APP_CONSTANTS} from '../utils/constants';
import {get as _get} from 'lodash';
import {stringify} from 'querystring';

/**
 * Function to get complete URL
 * @param endPoint : string
 */
const getCompleteUrl = (endPoint: string) => {
  /*
  TODO : conditions to be added based on the current environment
  */
  const hostUrl = url.localApiUrl;
  return `${hostUrl}${apiConstants.API_END_POINT_PREFIX}${apiConstants.API_VERSION}${endPoint}`;
};

/**
 * Funtion to get queryParams
 * @param qParam : object
 */
const getQueryParams = (qParam: object) => {
  const queryString = require('query-string');
  return queryString.stringify(qParam);
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

/**
 * GET request
 * @param endPoint : string
 */
export const getRequest = (
  endPoint: string,
  params?: object,
  qParams?: object,
) => {
  return new Promise(async (resolve, reject) => {
    // await to block next execution, waiting for authToken
    const token = await getAuthToken();
    axios
      .get(getCompleteUrl(endPoint), {
        headers: getHeaders(token),
        params: qParams,
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

/**
 * POST request
 * @param endPoint : string
 * @param params : object
 */
export const postRequest = (
  endPoint: string,
  params?: object,
  qParams?: object,
) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAuthToken();
    axios
      .post(getCompleteUrl(endPoint), params, {
        headers: getHeaders(token),
        params: qParams,
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

/**
 * PUT request
 * @param endPoint string
 * @param params : object
 */
export const putRequest = (
  endPoint: string,
  params?: object,
  qParams?: object,
) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAuthToken();
    axios
      .put(getCompleteUrl(endPoint) + `/${qParams.id}`, params, {
        headers: getHeaders(token),
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

/**
 * PATCH request
 * @param endPoint string
 * @param params : object
 */
export const patchRequest = (
  endPoint: string,
  params: Object,
  qParams: object,
) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAuthToken();
    axios
      .patch(getCompleteUrl(endPoint) + `/${_get(qParams, 'id', '')}`, params, {
        headers: getHeaders(token),
        params: qParams,
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

/**
 * DELETE request
 * @param endPoint : string
 */
export const deleteRequest = (endPoint: string) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAuthToken();
    axios
      .delete(getCompleteUrl(endPoint), {
        headers: getHeaders(token),
        timeout: apiConstants.TIMEOUT,
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

/**
 * GET_ALL request
 * @param endPointList : array : List of endPoints
 */
export const getAllRequest = (endPointList: any) => {
  return new Promise((resolve, reject) => {
    axios
      .all(
        endPointList.map((item: string) => {
          return getCompleteUrl(item);
        }),
      )
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

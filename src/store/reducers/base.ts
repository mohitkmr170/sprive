import {createAction, handleActions} from 'redux-actions';
import {get as _get} from 'lodash';
import {logoutUser} from '../actions/actions';
import {store} from '../configStore';
import {navigate} from '../../navigation/navigationService';
import {
  setAuthToken,
  showSnackBar,
  getAuthToken,
  NAVIGATION_SCREEN_NAME,
  APP_CONSTANTS,
  DB_KEYS,
} from '../../utils';
import OneSignal from 'react-native-onesignal';
export class StoreFetchableData {
  constructor(name: any, apiService: any) {
    this.name = name;
    this.apiService = apiService;

    this.initialState = {
      isFetching: false,
      response: null,
      error: false,
    };

    this.actions = {
      fetch: createAction(`FETCH_${this.name}`),
      response: createAction(`RESPONSE_${this.name}`),
      error: createAction(`ERROR_${this.name}`),
      clear: createAction(`CLEAR_${this.name}`),
    };

    this.reducers = handleActions(
      {
        [this.actions.fetch]: state => ({
          ...state,
          isFetching: true,
          error: false,
        }),
        [this.actions.response]: (state, action) => ({
          ...state,
          isFetching: false,
          response: action.payload,
          error: false,
        }),
        [this.actions.error]: (state, action) => ({
          ...state,
          isFetching: false,
          error: true,
          response: action.payload,
        }),
        [this.actions.clear]: state => ({
          ...state,
          isFetching: false,
          error: false,
          response: null,
        }),
      },
      this.initialState,
    );
  }

  fetchData(data: any, moreData: any) {
    const that = this;
    return new Promise((resolve, reject) => {
      that
        .apiService(data, moreData)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: any) => {
          if (that.name === 'getUserInfo') return reject(err);
          getAuthToken().then(res => {
            if (res && res !== APP_CONSTANTS.FALSE_TOKEN) {
              if (
                _get(err, DB_KEYS.USER_INFO_NAME, null) ===
                APP_CONSTANTS.NOT_AUTHENTICATED_CLASS_NAME
              ) {
                store.dispatch(logoutUser());
                OneSignal.removeExternalUserId();
                setAuthToken(
                  APP_CONSTANTS.FALSE_TOKEN,
                  _get(store.getState(), DB_KEYS.USER_INFO_EMAIL, ''),
                )
                  .then(response => {
                    navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
                  })
                  .catch(error => {
                    showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
                  });
              }
            }
          });

          return reject(err);
        });
    });
  }
}

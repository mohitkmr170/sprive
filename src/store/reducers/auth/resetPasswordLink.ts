import {resetPasswordLink as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {
  showSnackBar,
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
} from '../../../utils';
import {navigate} from '../../../navigation/navigationService';
import {get as _get} from 'lodash';

class resetPasswordLinkData extends StoreFetchableData {
  constructor() {
    super('resetPasswordLink', getApi);
  }
  fetchCall(data: any) {
    return dispatch =>
      dispatch(this.actions.fetch()) &&
      this.fetchData(data)
        .then((res: any) => {
          dispatch(this.actions.response(res));
        })
        .catch((err: any) => {
          dispatch(this.actions.error(err));
          if (_get(err, DB_KEYS.IS_BLOCKED, false)) {
            navigate(NAVIGATION_SCREEN_NAME.ACCOUNT_BLOCKED, {
              blockedType: DB_KEYS.RESET_PASSWORD.PASSWORD_RESET,
            });
          }
          showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE_FORM);
        });
  }
}

export var resetPasswordLink = new resetPasswordLinkData();

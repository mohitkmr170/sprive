import {loginUser as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {
  showSnackBar,
  localeString,
  APP_CONSTANTS,
  LOCALE_STRING,
} from '../../../utils';

class loginUserData extends StoreFetchableData {
  constructor() {
    super('loginUser', getApi);
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
          showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE_FORM);
        });
  }
}

export var loginUser = new loginUserData();

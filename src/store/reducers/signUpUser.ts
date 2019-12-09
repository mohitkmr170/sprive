import {signUpUser as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFunctions';
import {APP_CONSTANTS} from '../../utils/constants';

class signUpUserData extends StoreFetchableData {
  constructor() {
    super('signUpUser', getApi);
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
          showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE);
        });
  }
}

export var signUpUser = new signUpUserData();

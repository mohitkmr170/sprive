import {resetPasswordLink as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFunctions';
import {APP_CONSTANTS} from '../../utils/constants';

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
          showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE_FORM);
        });
  }
}

export var resetPasswordLink = new resetPasswordLinkData();

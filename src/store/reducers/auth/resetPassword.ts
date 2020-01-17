import {resetPassword as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar} from '../../../utils/helperFunctions';
import {APP_CONSTANTS} from '../../../utils/constants';

class resetPasswordData extends StoreFetchableData {
  constructor() {
    super('resetPassword', getApi);
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
        });
  }
}

export var resetPassword = new resetPasswordData();

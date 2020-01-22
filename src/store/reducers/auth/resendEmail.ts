import {resendEmail as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar, APP_CONSTANTS} from '../../../utils';

class resendEmailData extends StoreFetchableData {
  constructor() {
    super('resendEmail', getApi);
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

export var resendEmail = new resendEmailData();

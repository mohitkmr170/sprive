import {setUserAuthPin as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {
  showSnackBar,
  localeString,
  APP_CONSTANTS,
  LOCALE_STRING,
} from '../../../utils';

class setUserAuthPinData extends StoreFetchableData {
  constructor() {
    super('setUserAuthPin', getApi);
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

export var setUserAuthPin = new setUserAuthPinData();

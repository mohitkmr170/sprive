import {dismissSingleNotification as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar, APP_CONSTANTS} from '../../../utils';

class dismissSingleNotificationData extends StoreFetchableData {
  constructor() {
    super('dismissSingleNotification', getApi);
  }
  fetchCall(data: any, moreData: any) {
    return dispatch =>
      dispatch(this.actions.fetch()) &&
      this.fetchData(data, moreData)
        .then((res: any) => {
          dispatch(this.actions.response(res));
        })
        .catch((err: any) => {
          dispatch(this.actions.error(err));
        });
  }
}

export var dismissSingleNotification = new dismissSingleNotificationData();

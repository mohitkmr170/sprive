import {getAllNotifications as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar} from '../../../utils';

class getAllNotificationsData extends StoreFetchableData {
  constructor() {
    super('getAllNotifications', getApi);
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
          showSnackBar(err);
        });
  }
}

export var getAllNotifications = new getAllNotificationsData();

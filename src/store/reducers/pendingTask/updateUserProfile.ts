import {updateUserProfile as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar, APP_CONSTANTS} from '../../../utils';

class updateUserProfileData extends StoreFetchableData {
  constructor() {
    super('updateUserProfile', getApi);
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
          showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE_FORM);
        });
  }
}

export var updateUserProfile = new updateUserProfileData();

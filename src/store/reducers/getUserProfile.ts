import {getUserProfile as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';

class GetUserProfileData extends StoreFetchableData {
  constructor() {
    super('getUserProfile', getApi);
  }
  fetchCall(data: any) {
    const that = this;
    return dispatch =>
      this.fetchData(data)
        .then((res: any) => {
          dispatch(that.actions.response(res));
        })
        .catch((err: any) => dispatch(that.actions.error(err)));
  }
}

export var getUserProfile = new GetUserProfileData();

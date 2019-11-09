import {loginUser as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFuntions';

class loginUserData extends StoreFetchableData {
  constructor() {
    super('loginUser', getApi);
  }
  fetchCall(data: any) {
    const that = this;
    return dispatch =>
      dispatch(that.actions.fetch()) &&
      this.fetchData(data)
        .then((res: any) => {
          dispatch(that.actions.response(res));
        })
        .catch((err: any) => {
          dispatch(that.actions.error(err));
          showSnackBar(err);
        });
  }
}

export var loginUser = new loginUserData();

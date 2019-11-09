import {signUpUser as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFuntions';

class signUpUserData extends StoreFetchableData {
  constructor() {
    super('signUpUser', getApi);
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

export var signUpUser = new signUpUserData();

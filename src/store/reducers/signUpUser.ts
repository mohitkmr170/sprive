import {signUpUser as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFunctions';

class signUpUserData extends StoreFetchableData {
  constructor() {
    super('signUpUser', getApi);
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
          showSnackBar(err);
        });
  }
}

export var signUpUser = new signUpUserData();

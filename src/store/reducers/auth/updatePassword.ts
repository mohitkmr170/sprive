import {updatePassword as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';

class updatePasswordData extends StoreFetchableData {
  constructor() {
    super('updatePassword', getApi);
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

export var updatePassword = new updatePasswordData();

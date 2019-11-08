import {getUserInfo as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';

class getUserInfoData extends StoreFetchableData {
  constructor() {
    super('getUserInfo', getApi);
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

export var getUserInfo = new getUserInfoData();

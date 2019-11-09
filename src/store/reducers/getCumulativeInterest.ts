import {getCumulativeInterest as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFunctions';

class getCumulativeInterestData extends StoreFetchableData {
  constructor() {
    super('getCumulativeInterest', getApi);
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

export var getCumulativeInterest = new getCumulativeInterestData();

import {updateUserMortgage as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFunctions';

class updateUserMortgageData extends StoreFetchableData {
  constructor() {
    super('updateUserMortgage', getApi);
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

export var updateUserMortgage = new updateUserMortgageData();

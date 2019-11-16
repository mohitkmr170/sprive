import {setUserGoal as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';
import {showSnackBar} from '../../utils/helperFunctions';

class setUserGoalData extends StoreFetchableData {
  constructor() {
    super('setUserGoal', getApi);
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

export var setUserGoal = new setUserGoalData();

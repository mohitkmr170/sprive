import {setIssue as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar} from '../../../utils';

class setIssueData extends StoreFetchableData {
  constructor() {
    super('setIssue', getApi);
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

export var setIssue = new setIssueData();

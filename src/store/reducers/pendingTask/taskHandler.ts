import {taskHandler as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {get as _get} from 'lodash';
import {showSnackBar, DB_KEYS} from '../../../utils';

class taskHandlerData extends StoreFetchableData {
  constructor() {
    super('taskHandler', getApi);
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
          showSnackBar({}, _get(err, DB_KEYS.ERROR_MESSAGE, ''));
        });
  }
}

export var taskHandler = new taskHandlerData();

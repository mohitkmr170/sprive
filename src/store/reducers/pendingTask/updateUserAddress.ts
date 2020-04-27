import {updateUserAddress as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {get as _get} from 'lodash';
import {showSnackBar, APP_CONSTANTS, DB_KEYS} from '../../../utils';

class updateUserAddressData extends StoreFetchableData {
  constructor() {
    super('updateUserAddress', getApi);
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
          if (_get(err, DB_KEYS.IS_ADDRESS_VERIFIED, false))
            showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE_FORM);
        });
  }
}

export var updateUserAddress = new updateUserAddressData();

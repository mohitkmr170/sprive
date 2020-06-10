import {verifyEmail as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {
  localeString,
  showSnackBar,
  APP_CONSTANTS,
  LOCALE_STRING,
  LOCAL_KEYS,
} from '../../../utils';
import {version as appVersion} from '../../../../package.json';
import {_gaLogEvent} from '../../../utils';

class verifyEmailData extends StoreFetchableData {
  constructor() {
    super('verifyEmail', getApi);
  }
  fetchCall(data: any) {
    return dispatch =>
      dispatch(this.actions.fetch()) &&
      this.fetchData(data)
        .then((res: any) => {
          dispatch(this.actions.response(res));
          try {
            console.log('Firebase app_version ::');
            _gaLogEvent(LOCAL_KEYS.APP_VERSION, {
              version: appVersion,
            });
          } catch (error) {
            console.log('Firebase app_version ::');
          }
        })
        .catch((err: any) => {
          dispatch(this.actions.error(err));
          // showSnackBar(err, '', APP_CONSTANTS.SCREEN_TYPE_FORM);
        });
  }
}

export var verifyEmail = new verifyEmailData();

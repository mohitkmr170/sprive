import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  Image,
  Platform,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import {splashScreen, iSprive} from '../assets';
import {get as _get} from 'lodash';
import Moment from 'moment';
import {
  getUserInfo,
  getMonthlyPaymentRecord,
  getProjectedData,
  getUserMortgageData,
  getUserGoal,
  getPendingTask,
  getAllNotifications,
} from '../store/reducers';
import {connect} from 'react-redux';
import {
  getAuthToken,
  resetAuthToken,
  localeString,
  COLOR,
  DB_KEYS,
  PAYLOAD_KEYS,
  APP_CONSTANTS,
  LOCALE_STRING,
  BIOMETRY_TYPE,
  NOTIFICATION_CONSTANTS,
  BIOMETRIC_KEYS,
  STYLE_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
} from '../utils';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {verticalScale} from 'react-native-size-matters/extend';
import {reset} from '../navigation/navigationService';
import Snackbar from 'react-native-snackbar';
import OneSignal from 'react-native-onesignal';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {notification} from '../store/actions/actions';
const codePush = require('react-native-code-push');
const APP_UPDATED_SUCCESS: string = 'App has been updated.';

const LAUNCH_STATUS = 'alreadyLaunched';
const FIRST_LAUNCH = 'firstLaunch';
const AUTH_STACK = 'Auth';
const APP_LOAD_TIME = 2000;
const CODEPUSH_SNACKBAR = {
  CTA_TEXT: 'Details',
  CTA_TEXT_COLOR: 'green',
};

interface props {
  navigation: {
    navigate: (firstParam: any, navigationParams?: object) => void;
  };
  getUserInfo: () => void;
  getUserInfoResponse: object;
  getUserInfoResponses: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecord: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecordResponse: object;
  getProjectedData: (payload: object, extraPayload: object) => void;
  getProjectedDataResponse: object;
  userDataChangeEvent: object;
  triggerUserDataChange: (value: boolean) => void;
  getUserMortgageDataResponse: object;
  getUserMortgageData: (payload: object, extraPayload: object) => void;
  getUserGoal: (payload: object, extraPayload: object) => void;
  getUserGoalResponse: object;
  notification: () => void;
  notificationResponse: object;
  getPendingTask: (payload: object, extraPayload: object) => void;
  getPendingTaskResponse: object;
  handlePopupDismissed: () => void;
  getAllNotifications: (payload: object, extraPayload: object) => void;
  getAllNotificationsResponse: object;
}

interface state {}

class UnconnectedAuthLoading extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  authFlowCheck = () => {
    AsyncStorage.getItem(LAUNCH_STATUS).then(async value => {
      if (!value) {
        AsyncStorage.setItem(LAUNCH_STATUS, FIRST_LAUNCH);
        resetAuthToken()
          .then(res =>
            setTimeout(() => {
              StatusBar.setHidden(false, 'fade');
              this.props.navigation.navigate(AUTH_STACK);
            }, APP_LOAD_TIME),
          )
          .catch(err => console.log(err));
      } else {
        getAuthToken()
          .then(res => {
            setTimeout(() => {
              this.authCheck(res);
            }, APP_LOAD_TIME);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  handleUserInfo = () => {
    const {getUserInfoResponse, navigation} = this.props;
    /*
        TODO : Below condition should be reviewed later
        */
    StatusBar.setHidden(false, 'fade');
    if (
      !_get(getUserInfoResponse, DB_KEYS.VERIFICATION_FLOW.IS_VERIFIED, true)
    ) {
      if (
        _get(getUserInfoResponse, DB_KEYS.VERIFICATION_FLOW.IS_BLOCKED, true)
      ) {
        navigation.navigate(NAVIGATION_SCREEN_NAME.ACCOUNT_BLOCKED);
      } else navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
    } else {
      this.preApiCalls();
    }
  };

  handlePinVerification = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.VERIFY_PIN_SCREEN);
  };

  handleFaceIdError = (errorKey: string) => {
    Alert.alert(errorKey, '', [
      {
        text: localeString(LOCALE_STRING.SECURE_LOGIN.ENTER_PIN),
        onPress: () => {
          this.handlePinVerification();
        },
      },
    ]);
  };

  biometricAuthentication = () => {
    FingerprintScanner.isSensorAvailable()
      .then(biometrictype => {
        console.log(
          'biometrictype success ::',
          JSON.parse(JSON.stringify(biometrictype)),
        );
        const description: string = `Scan you ${biometrictype} to proceed`;
        FingerprintScanner.authenticate({
          description: description,
          fallbackEnabled: true,
        })
          .then(() => {
            this.handleUserInfo();
            this.props.handlePopupDismissed();
          })
          .catch((error: object) => {
            // this.props.handlePopupDismissed();
            const biometricValidaitionError = JSON.parse(JSON.stringify(error));
            console.log(
              'biometric validation error',
              JSON.parse(JSON.stringify(error)),
            );
            if (
              biometricValidaitionError.name ===
                BIOMETRIC_KEYS.CTA.USER_FALLBACK ||
              biometricValidaitionError.name === BIOMETRIC_KEYS.CTA.CANCEL
            )
              this.handlePinVerification();
          });
      })
      .catch(error => {
        const sensorError = JSON.parse(JSON.stringify(error));
        console.log('biometrictype error ::', sensorError);
        if (
          _get(sensorError, BIOMETRIC_KEYS.BIOMETRIC, '') ===
          BIOMETRY_TYPE.FACE_ID
        ) {
          let faceIdError = _get(sensorError, BIOMETRIC_KEYS.NAME, '');
          switch (faceIdError) {
            case BIOMETRIC_KEYS.ERROR_KEY.NOT_ENROLLED:
              this.handleFaceIdError(
                localeString(LOCALE_STRING.SECURE_LOGIN.FACE_ID_NOT_ENROLLED),
              );
              break;
            case BIOMETRIC_KEYS.ERROR_KEY.NOT_AVAILABLE:
              this.handleFaceIdError(
                localeString(LOCALE_STRING.SECURE_LOGIN.FACE_NOT_AVAILABLE),
              );
              break;
            default:
              this.handleFaceIdError(
                localeString(LOCALE_STRING.SECURE_LOGIN.GENERAL_FACE_ID_ERROR),
              );
          }
        }
      });
  };

  async componentDidMount() {
    StatusBar.setHidden(true, 'fade');
    this.authFlowCheck();
    /*
    NOTES : Remember to update the current version to be updated => CFBundleShortVersionString
    */
    try {
      let codePushUpdateResponse = await codePush.getUpdateMetadata();
      console.log(
        'componentDidMount : getUpdateMetadata : update => ',
        codePushUpdateResponse,
      );
      if (
        codePushUpdateResponse &&
        codePushUpdateResponse.isFirstRun &&
        !codePushUpdateResponse.isPending
      ) {
        setTimeout(() => {
          Snackbar.show({
            text: APP_UPDATED_SUCCESS,
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: CODEPUSH_SNACKBAR.CTA_TEXT,
              textColor: CODEPUSH_SNACKBAR.CTA_TEXT_COLOR,
              onPress: () => {
                const UPDATE_DESCRIPTION: string = codePushUpdateResponse.description
                  ? codePushUpdateResponse.description
                  : '';
                Alert.alert('Update Description', UPDATE_DESCRIPTION);
              },
            },
          });
        }, APP_LOAD_TIME);
      }
    } catch (error) {
      Snackbar.show({
        text: APP_CONSTANTS.GENERAL_ERROR,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  preApiCalls = async () => {
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponses,
      getProjectedData,
      navigation,
      getUserMortgageData,
      getUserGoal,
      notificationResponse,
      getPendingTask,
      getAllNotifications,
    } = this.props;
    const userId = _get(getUserInfoResponses, DB_KEYS.DATA_ID, null);
    const isNotificationReceived = _get(
      notificationResponse,
      DB_KEYS.IS_NOTIFICATION_RECEIVED,
      false,
    );
    if (!getUserInfoResponses || !userId)
      navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const pendingTask_qParam = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getPendingTask({}, pendingTask_qParam);
    const {getUserMortgageDataResponse} = this.props;
    const creationDate = Moment()
      .subtract(48, 'days')
      .format('YYYY-MM-DD');
    const qParam = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      'createdAt[$gt]': creationDate,
      dismissed: false,
    };
    await getAllNotifications({}, qParam);
    if (!_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE_DATA, null)) {
      navigation.navigate(
        isNotificationReceived
          ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
          : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
        {
          isUserDataChanged: true,
        },
      );
      return;
    }
    const qParam_monthly_payment_record = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.GRAPH.CURRENT_DATE]: new Date().toISOString(),
    };
    const qParam_get_user_goal = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserGoal({}, qParam_get_user_goal);
    const {getUserGoalResponse} = this.props;
    if (!_get(getUserGoalResponse, DB_KEYS.RESPONSE_DATA, []).length) {
      navigation.navigate(
        isNotificationReceived
          ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
          : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
        {
          isUserDataChanged: true,
        },
      );
      return;
    }
    const mortgageTerm = _get(
      getUserGoalResponse,
      DB_KEYS.NEW_MORTGAGE_TERM,
      null,
    );
    const monthlyOverPayment = _get(
      getUserGoalResponse,
      DB_KEYS.GOAL_OVERPAYMENT,
      null,
    );
    if (
      !(!monthlyOverPayment && mortgageTerm === APP_CONSTANTS.MIN_GOAL_VALUE)
    ) {
      await getMonthlyPaymentRecord({}, qParam_monthly_payment_record);
      const qParamProjectData = {
        user_id: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      };
      await getProjectedData({}, qParamProjectData);
      const externalUserId = _get(
        getUserInfoResponses,
        DB_KEYS.PUSH_NOTIFICATION,
        '',
      );
      if (externalUserId) {
        OneSignal.setExternalUserId(externalUserId);
      }
      navigation.navigate(
        isNotificationReceived
          ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
          : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
        {
          isUserDataChanged: false,
        },
      );
    } else
      navigation.navigate(
        isNotificationReceived
          ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
          : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
        {
          isUserDataChanged: true,
        },
      );
  };

  // Auth check, based on which navigation to auth/app stack is decided

  async authCheck(authToken: string) {
    const {navigation} = this.props;
    // Token does not exist locally
    if (!authToken) {
      navigation.navigate(AUTH_STACK);
    }
    // Token exists
    else {
      const {getUserInfo} = this.props;
      await getUserInfo();
      const {getUserInfoResponse, getUserInfoResponses} = this.props;
      if (_get(getUserInfoResponse, DB_KEYS.AUTH_STATUS, false)) {
        if (Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_ANDROID) {
          if (_get(getUserInfoResponses, DB_KEYS.IS_PIN_ENABLED, false)) {
            // pinAuth = true
            this.handlePinVerification();
          } else {
            this.handleUserInfo();
          }
        } else {
          if (
            !_get(getUserInfoResponses, DB_KEYS.IS_FACE_ID_ENABLED, false) &&
            !_get(getUserInfoResponses, DB_KEYS.IS_PIN_ENABLED, false)
          ) {
            // Two factor auth not enabled
            this.handleUserInfo();
          } else if (
            // pinAuth = true && faceID = true
            _get(getUserInfoResponses, DB_KEYS.IS_PIN_ENABLED, false) &&
            _get(getUserInfoResponses, DB_KEYS.IS_FACE_ID_ENABLED, false)
          ) {
            this.biometricAuthentication();
          } else {
            this.handlePinVerification();
          }
        }
      } else {
        StatusBar.setHidden(false, 'fade');
        navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      }
    }
  }
  render() {
    return (
      <ImageBackground
        source={splashScreen}
        resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.STRETCH}
        style={styles.mainContainer}>
        <Image
          source={iSprive}
          style={styles.logo}
          resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
        />
        <View>
          <Text style={styles.titleText}>
            {localeString(LOCALE_STRING.SPLASH_SCREEN.TITLE)}
          </Text>
          <Text style={styles.titleText}>
            {localeString(LOCALE_STRING.SPLASH_SCREEN.SUB_TITLE)}
          </Text>
        </View>
        <Text style={styles.infoText}>
          {localeString(LOCALE_STRING.SPLASH_SCREEN.INFO)}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop:
      Platform.OS === 'ios'
        ? verticalScale(getStatusBarHeight()) +
          3 * STYLE_CONSTANTS.padding.LARGEST
        : 3 * STYLE_CONSTANTS.padding.LARGEST,
    paddingHorizontal:
      STYLE_CONSTANTS.padding.HUGE + STYLE_CONSTANTS.padding.SMALLEST,
    justifyContent: 'space-between',
    paddingBottom: 3 * STYLE_CONSTANTS.padding.LARGEST,
  },
  titleText: {
    fontSize:
      STYLE_CONSTANTS.font.SIZE.LARGEST + STYLE_CONSTANTS.font.SIZE.TINY,
    lineHeight:
      STYLE_CONSTANTS.font.LINEHEIGHT.HUGER +
      STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  logo: {
    height: STYLE_CONSTANTS.SPLASH_DIMENSION.height,
    width: STYLE_CONSTANTS.SPLASH_DIMENSION.width,
  },
});

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo.response,
  getUserInfoResponses: state.getUserInfo,
  getMonthlyPaymentRecordResponse: state.getMonthlyPaymentRecord,
  getProjectedDataResponse: state.getProjectedData,
  userDataChangeEvent: state.userDataChangeReducer,
  getUserMortgageDataResponse: state.getUserMortgageData,
  getUserGoalResponse: state.getUserGoal,
  notificationResponse: state.notification,
  getPendingTaskResponse: state.getPendingTask,
  getAllNotificationsResponse: state.getAllNotifications,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  getMonthlyPaymentRecord: (payload, extraPayload) =>
    dispatch(getMonthlyPaymentRecord.fetchCall(payload, extraPayload)),
  getProjectedData: (payload, extraPayload) =>
    dispatch(getProjectedData.fetchCall(payload, extraPayload)),
  triggerUserDataChange: value => dispatch(triggerUserDataChangeEvent(value)),
  getUserMortgageData: (payload, extraPayload) =>
    dispatch(getUserMortgageData.fetchCall(payload, extraPayload)),
  getUserGoal: (payload, extraPayload) =>
    dispatch(getUserGoal.fetchCall(payload, extraPayload)),
  notification: () => dispatch(notification()),
  getPendingTask: (payload, extraPayload) =>
    dispatch(getPendingTask.fetchCall(payload, extraPayload)),
  getAllNotifications: (payload, extraPayload) =>
    dispatch(getAllNotifications.fetchCall(payload, extraPayload)),
});

export const AuthLoading = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedAuthLoading);

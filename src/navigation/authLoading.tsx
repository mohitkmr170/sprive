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
} from 'react-native';
import {splashScreen, iSprive} from '../assets';
import {getAuthToken} from '../utils/helperFunctions';
import {get as _get} from 'lodash';
import {
  getUserInfo,
  getMonthlyPaymentRecord,
  getProjectedData,
  getUserMortgageData,
  getUserGoal,
} from '../store/reducers';
import {connect} from 'react-redux';
import {
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
  LOCALE_STRING,
  APP_CONSTANTS,
} from '../utils/constants';
import {PAYLOAD_KEYS} from '../utils/payloadKeys';
import {resetAuthToken} from '../utils/helperFunctions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLOR} from '../../src/utils/colors';
import {localeString} from '../utils/i18n';
import {verticalScale} from 'react-native-size-matters/extend';
import {reset} from '../navigation/navigationService';

const LAUNCH_STATUS = 'alreadyLaunched';
const FIRST_LAUNCH = 'firstLaunch';
const AUTH_STACK = 'Auth';
const APP_LOAD_TIME = 2000;
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

  async componentDidMount() {
    StatusBar.setHidden(true, 'fade');
    this.authFlowCheck();
  }

  preApiCalls = async () => {
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponses,
      getProjectedData,
      navigation,
      getUserMortgageData,
      getUserGoal,
    } = this.props;
    const userId = _get(getUserInfoResponses, DB_KEYS.DATA_ID, null);
    if (!getUserInfoResponses || !userId)
      navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const {getUserMortgageDataResponse} = this.props;
    if (!_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE_DATA, null)) {
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: true,
      });
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
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: true,
      });
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
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: false,
      });
    } else
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: true,
      });
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
      const {getUserInfoResponse} = this.props;
      if (_get(getUserInfoResponse, DB_KEYS.AUTH_STATUS, false)) {
        /*
        TODO : Below condition should be reviewed later
        */
        StatusBar.setHidden(false, 'fade');
        if (
          !_get(
            getUserInfoResponse,
            DB_KEYS.VERIFICATION_FLOW.IS_VERIFIED,
            true,
          )
        ) {
          navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
        } else {
          this.preApiCalls();
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
          3 * verticalScale(STYLE_CONSTANTS.padding.LARGEST)
        : 3 * verticalScale(STYLE_CONSTANTS.padding.LARGEST),
    paddingHorizontal:
      verticalScale(STYLE_CONSTANTS.padding.HUGE) +
      verticalScale(STYLE_CONSTANTS.padding.SMALLEST),
    justifyContent: 'space-between',
    paddingBottom: 3 * verticalScale(STYLE_CONSTANTS.padding.LARGEST),
  },
  titleText: {
    fontSize:
      verticalScale(STYLE_CONSTANTS.font.SIZE.LARGEST) +
      verticalScale(STYLE_CONSTANTS.font.SIZE.TINY),
    lineHeight:
      verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGER) +
      verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.SMALL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH),
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  logo: {
    height: verticalScale(STYLE_CONSTANTS.SPLASH_DIMENSION.height),
    width: verticalScale(STYLE_CONSTANTS.SPLASH_DIMENSION.width),
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
});

export const AuthLoading = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedAuthLoading);

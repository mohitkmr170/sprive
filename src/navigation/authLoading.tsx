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
  Linking,
} from 'react-native';
import {splashScreen, iSprive} from '../assets';
import {getAuthToken, showSnackBar} from '../utils/helperFunctions';
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
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {reset} from '../navigation/navigationService';

const LAUNCH_STATUS = 'alreadyLaunched';
const FIRST_LAUNCH = 'firstLaunch';
const AUTH_STACK = 'Auth';
const APP_STACK = 'App';
const APP_LOAD_TIME = 2000;

// interface NavigationParams {
//   isUserDataChanged: boolean;
// }
interface props {
  navigation: {
    navigate: (firstParam: any, navigationParams?: object) => void;
    // setParams: (params: NavigationParams) => void;
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
  handleOpenUrl = (event: any) => {
    this.navigate(event);
  };
  /**
   * FUnction to split and extract navigation route and params
   * @param : url : complete deeplink URL
   */
  navigate = (url: any) => {
    console.log('inside deeplink', url);
    const {navigate} = this.props.navigation;
    // const route = url.replace(/.*?:\/\//g, '');
    // const id = route.match(/\/([^\/]+)\/?$/)[1];
    // const routeName = route.split('/')[0];
    const deepLinkToken = url.split('=')[1];
    // if (routeName === 'sprive') {
    navigate('DeepLinkLandingScreen', {
      deepLinkToken: deepLinkToken,
    });
    // } else {
    //   showSnackBar({}, 'Issue with Deeplink');
    // }
  };
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
  // async test() {
  //   // let deeplinkURL = '';
  //   const initialLink = await dynamicLinks().getInitialLink();
  //   // deeplinkURL = initialLink;
  //   // let continuousLink = "";
  //   console.log('initialLink::', initialLink);
  //   dynamicLinks().onLink((link: any) => {
  //     // Handle dynamic link inside your own application
  //     console.log('nested block::', link);
  //     // continuousLink = link
  //     // deeplinkURL = link;
  //   });
  //   // deeplinkURL = (initialLink)?initialLink:(continuousLink)?continuousLink:'';
  //   // if (deeplinkURL) {
  //   //   this.handleOpenUrl(deeplinkURL);
  //   // } else this.authFlowCheck();
  // }

  // async getDeeplinkUrl() {
  //   let deeplinkUrl: string = '';
  //   const initialLink: any = await dynamicLinks().getInitialLink();
  //   console.log('initialLink:::', initialLink);
  //   let continuousLink: any = null;
  //   dynamicLinks().onLink((link: any) => {
  //     continuousLink = link;
  //   });
  //   console.log('continuousLink:::', continuousLink);
  //   deeplinkUrl = initialLink.url
  //     ? initialLink.url
  //     : continuousLink.url
  //     ? continuousLink.url
  //     : null;
  //   return deeplinkUrl;
  // }

  getDeeplinkUrl() {
    return new Promise(async (resolve: any, reject: any) => {
      console.log('geekybaba:::::');

      let deeplinkUrl: string = '';
      const initialLink: any = await dynamicLinks().getInitialLink();
      if (initialLink && initialLink.url) return resolve(initialLink.url);

      dynamicLinks().onLink((link: any) => {
        console.log('dynamicLinks::::', link);

        if (link && link.url) return resolve(link.url);
      });
      return resolve(null);
    });
  }

  async test() {
    const initialLink = await dynamicLinks().getInitialLink();
    console.log('initialLink::', initialLink);
    if (_get(initialLink, 'url', null)) this.handleOpenUrl(initialLink.url);
    else {
      console.log('here1');
      dynamicLinks().onLink((link: any) => {
        console.log('nested block::', link);
        this.handleOpenUrl(link.url);
      });
    }
  }

  async componentDidMount() {
    StatusBar.setHidden(true, 'fade');
    this.authFlowCheck();
    // console.log('this.test():::::::', this.test());
    // let deeplinkUrl = await this.getDeeplinkUrl();
    // console.log('deeplinkURL ::: ', deeplinkUrl);
    // if (deeplinkUrl) this.handleOpenUrl(deeplinkUrl);
    // else {
    //   console.log('inside appflow');
    //   this.authFlowCheck();
    // }
    // Linking.addEventListener('url', event => {
    //   console.log('akjsbdasd1', event);
    //   if (event.url) {
    //     // isDeepLink = true;
    //     this.handleOpenUrl(event);
    //   } else {
    //     this.authFlowCheck();
    //   }
    // });
    // if (!isDeepLink) {
    //   this.authFlowCheck();
    // }
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
    console.log('here1', userId);
    if (!getUserInfoResponses || !userId)
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    console.log('here2', qParamsInfo);
    await getUserMortgageData({}, qParamsInfo);
    const {getUserMortgageDataResponse} = this.props;
    if (!_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE_DATA, null)) {
      console.log('here3');
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: true,
      });
      return;
    }
    console.log('here4');
    const qParam_monthly_payment_record = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.GRAPH.CURRENT_DATE]: new Date().toISOString(),
    };
    //
    const qParam_get_user_goal = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserGoal({}, qParam_get_user_goal);
    //
    const {getUserGoalResponse} = this.props;
    if (!_get(getUserGoalResponse, DB_KEYS.RESPONSE_DATA, []).length) {
      console.log('here5');
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: true,
      });
      return;
    }
    console.log('here6');
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
      console.log('here7');
      await getMonthlyPaymentRecord({}, qParam_monthly_payment_record);
      const qParamProjectData = {
        user_id: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      };
      await getProjectedData({}, qParamProjectData);
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: false,
      });
      // navigation.setParams({
      //   isUserDataChanged: false,
      // });
    } else
      reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
        isUserDataChanged: true,
      });
  };

  // Auth check, based on which navigation to auth/app stack is decided

  async authCheck(authToken: string) {
    // Token does not exist locally
    if (!authToken) {
      this.props.navigation.navigate(AUTH_STACK);
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
        if (!_get(getUserInfoResponse, 'data.is_verified', true)) {
          this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
        } else {
          this.preApiCalls();
          // if (!this.state.loading) {
          // }
          // this.props.navigation.navigate(APP_STACK);
        }
      } else {
        StatusBar.setHidden(false, 'fade');
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      }
    }
  }
  render() {
    return (
      <ImageBackground
        source={splashScreen}
        resizeMode="stretch"
        style={styles.mainContainer}>
        <Image source={iSprive} style={styles.logo} resizeMode="contain" />
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

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
import {getUserInfo} from '../store/reducers';
import {connect} from 'react-redux';
import {
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
  LOCALE_STRING,
} from '../utils/constants';
import {resetAuthToken} from '../utils/helperFunctions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLOR} from '../../src/utils/colors';
import {localeString} from '../utils/i18n';
import {verticalScale, moderateScale} from 'react-native-size-matters/extend';

const LAUNCH_STATUS = 'alreadyLaunched';
const FIRST_LAUNCH = 'firstLaunch';
const AUTH_STACK = 'Auth';
const APP_STACK = 'App';
const APP_LOAD_TIME = 2000;
interface props {
  navigation: {
    navigate: (firstParam: any) => void;
    getUserInfo: () => void;
    getUserInfoResponse: object;
  };
}

interface state {}

class UnconnectedAuthLoading extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    StatusBar.setHidden(true, 'fade');
    AsyncStorage.getItem(LAUNCH_STATUS).then(async value => {
      if (!value) {
        AsyncStorage.setItem(LAUNCH_STATUS, FIRST_LAUNCH);
        resetAuthToken()
          .then(res =>
            setTimeout(() => {
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
  }

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
        StatusBar.setHidden(false, 'fade');
        this.props.navigation.navigate(APP_STACK);
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
    height: verticalScale(STYLE_CONSTANTS.SPLASH_DIMENSION.height),
    width: moderateScale(STYLE_CONSTANTS.SPLASH_DIMENSION.width),
  },
});

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo.response,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
});

export const AuthLoading = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedAuthLoading);

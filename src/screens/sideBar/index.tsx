import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../sideBar/styles';
import {connect} from 'react-redux';
import {logoutUser} from '../../store/actions/actions';
import {
  localeString,
  setAuthToken,
  showSnackBar,
  NAVIGATION_SCREEN_NAME,
  APP_CONSTANTS,
  DB_KEYS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  COLOR,
} from '../../utils';
import {
  iNotification,
  iAvatar,
  iPound,
  iSettings,
  iSupport,
  iUpdate,
  iRight,
  iLogOut,
} from '../../assets';
import {pushNotification} from '../../store/reducers';
import {closeDrawer} from '../../navigation/navigationService';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import OneSignal from 'react-native-onesignal';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  getUserInfoResponse: object;
  logoutUserAction: () => void;
  pushNotification: () => void;
  pushNotificationResponse: object;
}

const CLOSE_ICON_NAME = 'close';
const CURRENT_USER_LOCATION = 'London, UK';
interface state {}

export class UnconnectedSideBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  SIDEBAR_DATA = [
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.NOTIFICATION),
      icon: iNotification,
      action: async () => {
        closeDrawer();
        const {pushNotification} = this.props;
        await pushNotification();
        const {pushNotificationResponse} = this.props;
        if (!_get(pushNotificationResponse, DB_KEYS.ERROR, true)) {
          showSnackBar({}, localeString(LOCALE_STRING.GLOBAL.NOTIFICATION));
        }
      },
      isDisabled: _get(
        this.props.pushNotificationResponse,
        DB_KEYS.IS_FETCHING,
        false,
      ),
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.OVER_PAYMENT_HISTORY),
      icon: iPound,
      action: () =>
        this.props.navigation.navigate(
          NAVIGATION_SCREEN_NAME.OVERPAYMENT_HISTORY,
        ),
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.UPDATE_PASSWORD),
      icon: iUpdate,
      action: () =>
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.UPDATE_PASSWORD),
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.UPDATE_MORTGAGE.UPDATE_MORTGAGE),
      icon: iUpdate,
      action: () =>
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.UPDATE_MORTGAGE),
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.SETTINGS),
      icon: iSettings,
      action: () => {},
      isDisabled: true,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.SUPPORT),
      icon: iSupport,
      action: () => {},
      isDisabled: true,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.INVITE_FRIENDS),
      icon: iAvatar,
      action: () => {},
      isDisabled: true,
    },
  ];
  handleLogOut = async () => {
    this.props.logoutUserAction();
    OneSignal.removeExternalUserId();
    const {getUserInfoResponse} = this.props;
    setAuthToken(
      APP_CONSTANTS.FALSE_TOKEN,
      _get(getUserInfoResponse, DB_KEYS.CURRENT_USER_EMAIL, ''),
    )
      .then(response => {
        // showSnackBar(APP_CONSTANTS.LOG_OUT);
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      })
      .catch(error => {
        showSnackBar(APP_CONSTANTS.GENERAL_ERROR);
      });
  };
  render() {
    const {getUserInfoResponse} = this.props;
    let currentUserMail = _get(
      getUserInfoResponse,
      DB_KEYS.CURRENT_USER_EMAIL,
      '',
    );
    return (
      <View style={styles.mainContainer}>
        <View style={styles.innerMainContainer}>
          <View style={styles.centerContainer}>
            <View style={styles.profileContainer}>
              <Text style={styles.userNameText}>{currentUserMail}</Text>
              <Text style={styles.userLocationText}>
                {CURRENT_USER_LOCATION}
              </Text>
            </View>
            <View style={styles.centerContainer}>
              {this.SIDEBAR_DATA.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={item.isDisabled}
                    onPress={item.action}
                    style={styles.sideBarDataListContainer}>
                    <View style={styles.iconTextContainer}>
                      <Image
                        resizeMode="center"
                        style={styles.iconStyle}
                        source={item.icon}
                      />
                      <Text key={index} style={styles.titleText}>
                        {item.title}
                      </Text>
                    </View>
                    <Image source={iRight} />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <View style={styles.logOutContainer}>
                <TouchableOpacity
                  style={styles.logOutTouch}
                  onPress={() => this.handleLogOut()}>
                  <Image source={iLogOut} />
                  <Text style={styles.logOutText}>
                    {localeString(LOCALE_STRING.SIDE_BAR.LOG_OUT)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={APP_CONSTANTS.HIT_SLOP}
                  onPress={() => closeDrawer()}>
                  <Icon
                    name={CLOSE_ICON_NAME}
                    size={STYLE_CONSTANTS.padding.LARGEST}
                    color={COLOR.MEDUIM_OPACITY_BLACK}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  pushNotificationResponse: state.pushNotification,
});

const bindActions = dispatch => ({
  logoutUserAction: () => dispatch(logoutUser()),
  pushNotification: () => dispatch(pushNotification.fetchCall()),
});

export const SideBar = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSideBar);

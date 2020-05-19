import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {styles} from '../sideBar/styles';
import {connect} from 'react-redux';
import {
  logoutUser,
  paymentReminder,
  policyUpdate,
} from '../../store/actions/actions';
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
  TASK_IDS,
  STAGE_IDS,
} from '../../utils';
import {
  iAvatar,
  iPound,
  iSettings,
  iSupport,
  iRight,
  iLogOut,
} from '../../assets';
import {updateUserProfile, getUserInfo} from '../../store/reducers';
import {closeDrawer} from '../../navigation/navigationService';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import OneSignal from 'react-native-onesignal';
import {version as appVersion, name as appName} from '../../../package.json';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  getPendingTaskResponse: object;
  getUserInfoResponse: object;
  logoutUserAction: () => void;
  policyUpdate: () => void;
  paymentReminder: () => void;
}

const CLOSE_ICON_NAME = 'close';
const COUNTRY = 'UK';
interface state {}

export class UnconnectedSideBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleStageNavigation = (routeName: string, taskAndStageId: object) => {
    this.props.navigation.navigate(routeName, taskAndStageId);
  };
  getTargetNavigation = (item: object) => {
    const taskStageList: [] = _get(
      item,
      DB_KEYS.PENDING_TASK.TASK_STAGES,
      [],
    )[0]; //Taking the first pending taks
    let taskAndStageId = {
      taskId: _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null),
      stageId: _get(taskStageList, DB_KEYS.PENDING_TASK.ID, null),
    };
    if (
      taskStageList &&
      _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null) === TASK_IDS.TASK_ONE
    ) {
      switch (_get(taskAndStageId, DB_KEYS.PENDING_TASK.STAGE_ID, null)) {
        case STAGE_IDS.STAGE_ONE:
          this.handleStageNavigation(
            NAVIGATION_SCREEN_NAME.USER_PROFILE,
            taskAndStageId,
          );
          break;
        case STAGE_IDS.STAGE_TWO:
          this.handleStageNavigation(
            NAVIGATION_SCREEN_NAME.USER_ADDRESS,
            taskAndStageId,
          );
          break;
        default:
          showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
      }
    } else showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
  };

  SIDEBAR_DATA = [
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.USER_PROFILE),
      icon: iAvatar,
      action: () => {
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.PROFILE_SCREEN);
        // this.setState({isSubListOpened: true});
      },
      isDisabled: false,
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
      title: localeString(LOCALE_STRING.SIDE_BAR.SETTINGS),
      icon: iSettings,
      action: () => {
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SETTINGS_SCREEN);
        //  this.setState({isPasswordSectionClicked: true})
      },
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.SUPPORT),
      icon: iSupport,
      action: () =>
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.REPORT_ISSUE),
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.INVITE_FRIENDS),
      icon: iAvatar,
      action: () => {},
      isDisabled: true,
    },
  ];

  handleLogOut = async () => {
    OneSignal.removeExternalUserId();
    const {getUserInfoResponse} = this.props;
    setAuthToken(
      APP_CONSTANTS.FALSE_TOKEN,
      _get(getUserInfoResponse, DB_KEYS.CURRENT_USER_EMAIL, ''),
    )
      .then(response => {
        // showSnackBar(APP_CONSTANTS.LOG_OUT);
        this.props.logoutUserAction();
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      })
      .catch(error => {
        showSnackBar(APP_CONSTANTS.GENERAL_ERROR);
      });
  };

  render() {
    const {getUserInfoResponse} = this.props;
    let userName =
      _get(getUserInfoResponse, DB_KEYS.PENDING_TASK.USER_INFO.F_NAME, '') ||
      _get(getUserInfoResponse, DB_KEYS.PENDING_TASK.USER_INFO.L_NAME, '')
        ? _get(getUserInfoResponse, DB_KEYS.PENDING_TASK.USER_INFO.F_NAME, '') +
          ' ' +
          _get(getUserInfoResponse, DB_KEYS.PENDING_TASK.USER_INFO.L_NAME, '')
        : '';
    let userLocation = _get(
      getUserInfoResponse,
      DB_KEYS.PENDING_TASK.USER_INFO.ADDRESS.CITY,
      '',
    )
      ? _get(
          getUserInfoResponse,
          DB_KEYS.PENDING_TASK.USER_INFO.ADDRESS.CITY,
          '',
        ) +
        ', ' +
        COUNTRY
      : '';
    const currentRenderingList: any = this.SIDEBAR_DATA;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.innerMainContainer}>
          <View style={styles.centerContainer}>
            <View style={styles.profileContainer}>
              {/* Conditions to be added to displat NAME/SPRIVE */}
              <Text style={styles.userNameText}>
                {userName ? userName : ''}
              </Text>
              <Text style={styles.userLocationText}>
                {userLocation ? userLocation : ''}
              </Text>
            </View>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              {currentRenderingList
                ? currentRenderingList.map((item: any, index: any) => {
                    return (
                      <TouchableOpacity
                        disabled={item.isDisabled}
                        onPress={item.action}
                        style={styles.sideBarDataListContainer}>
                        <View
                          style={[
                            styles.iconTextContainer,
                            {
                              opacity: item.isDisabled ? 0.4 : 1,
                            }, //Graying out all non-working buttons
                          ]}>
                          <Image
                            resizeMode={
                              STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN
                            }
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
                  })
                : null}
            </ScrollView>
            <View>
              <Text style={[styles.logOutText, {paddingBottom: 16}]}>
                {appName} v{appVersion}
              </Text>
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
});

const bindActions = dispatch => ({
  paymentReminder: () => dispatch(paymentReminder()),
  policyUpdate: () => dispatch(policyUpdate()),
  logoutUserAction: () => dispatch(logoutUser()),
});

export const SideBar = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSideBar);

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../sideBar/styles';
import {connect} from 'react-redux';
import {checkNotifications} from 'react-native-permissions';
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
  STAGE_NAME_INDEX,
  APP_KEYS,
  LOCAL_KEYS,
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
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  getPendingTaskResponse: object;
  getUserInfoResponse: object;
  logoutUserAction: () => void;
  pushNotification: () => void;
  pushNotificationResponse: object;
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
  componentDidMount() {
    //If Address Task is complete(means profile is also not complete for task user-profile) => Show Actual NAME & ADDRESS
    // else as showing now
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
        const {getPendingTaskResponse} = this.props;
        let found = _get(
          getPendingTaskResponse,
          DB_KEYS.PENDING_TASK.TASKS,
          [],
        ).find(
          (item: object) =>
            _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null) ===
            STAGE_NAME_INDEX.USER_PROFILE,
        );
        _get(
          getPendingTaskResponse,
          DB_KEYS.PENDING_TASK.IS_PENDING_TASK,
          false,
        ) && found
          ? this.getTargetNavigation(found)
          : this.props.navigation.navigate(
              NAVIGATION_SCREEN_NAME.USER_PROFILE_VIEW_MODE,
            );
      },
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.NOTIFICATION),
      icon: iNotification,
      action: async () => {
        checkNotifications().then(async ({status, settings}) => {
          if (status === LOCAL_KEYS.PUSH_NOTIFICATION_ACCESS_GRANTED) {
            closeDrawer();
            const {pushNotification} = this.props;
            await pushNotification();
            const {pushNotificationResponse} = this.props;
            if (!_get(pushNotificationResponse, DB_KEYS.ERROR, true)) {
              this.props.policyUpdate();
            }
          } else
            showSnackBar({}, localeString(LOCALE_STRING.GLOBAL.NOTIFICATION));
        });
      },
      isDisabled: _get(
        this.props.pushNotificationResponse,
        DB_KEYS.IS_FETCHING,
        false,
      ),
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.PAYMENT_REMINDER),
      icon: iNotification,
      action: async () => {
        checkNotifications().then(async ({status, settings}) => {
          if (status === LOCAL_KEYS.PUSH_NOTIFICATION_ACCESS_GRANTED) {
            closeDrawer();
            const {pushNotification} = this.props;
            await pushNotification();
            const {pushNotificationResponse} = this.props;
            if (!_get(pushNotificationResponse, DB_KEYS.ERROR, true)) {
              this.props.paymentReminder();
            }
          } else {
            showSnackBar({}, localeString(LOCALE_STRING.GLOBAL.NOTIFICATION));
          }
        });
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

    return (
      <View style={styles.mainContainer}>
        <View style={styles.innerMainContainer}>
          <View style={styles.centerContainer}>
            <View style={styles.profileContainer}>
              {/* Conditions to be added to displat NAME/SPRIVE */}
              <Text style={styles.userNameText}>
                {userName ? userName : APP_KEYS.APP_NAME}
              </Text>
              <Text style={styles.userLocationText}>
                {userLocation ? userLocation : ''}
              </Text>
            </View>
            <View style={styles.centerContainer}>
              {this.SIDEBAR_DATA.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={item.isDisabled}
                    onPress={item.action}
                    style={styles.sideBarDataListContainer}>
                    <View
                      style={[
                        styles.iconTextContainer,
                        {opacity: item.isDisabled ? 0.4 : 1}, //Graying out all non-working buttons
                      ]}>
                      <Image
                        resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
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
  getPendingTaskResponse: state.getPendingTask,
});

const bindActions = dispatch => ({
  paymentReminder: () => dispatch(paymentReminder()),
  policyUpdate: () => dispatch(policyUpdate()),
  logoutUserAction: () => dispatch(logoutUser()),
  pushNotification: () => dispatch(pushNotification.fetchCall()),
});

export const SideBar = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSideBar);

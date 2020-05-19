import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  AppState,
} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {
  dashBoardCard,
  iNotification_message,
  correct,
  iViewArrow,
  questionMark,
  homeOwnershipCard,
} from '../../assets';
import {connect} from 'react-redux';
import Moment from 'moment';
import {
  PolicyUpdate,
  StatusOverlay,
  LoadingModal,
  PendingTaskDrawer,
  GeneralStatusBar,
  PaymentProgressCard,
} from '../../components';
import {get as _get, cloneDeep} from 'lodash';
import {
  localeString,
  getNumberWithCommas,
  _gaSetCurrentScreen,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  APP_CONSTANTS,
  DB_KEYS,
  COLOR,
  PAYLOAD_KEYS,
  LOCAL_KEYS,
  showSnackBar,
  NATIVE_EVENTS,
  NOTIFICATION_CONSTANTS,
  LISTENERS,
} from '../../utils';
import {
  getMonthlyPaymentRecord,
  getUserInfo,
  getProjectedData,
  getUserMortgageData,
  getUserGoal,
  getPendingTask,
  paymentRescheduleReminder,
  getAllNotifications,
  dismissSingleNotification,
  updateNextPaymentReminderDate,
  getRemoteConfigData,
} from '../../store/reducers';
import {policyUpdate, paymentReminder} from '../../store/actions/actions';
import {triggerUserDataChangeEvent} from '../../store/actions/user-date-change-action.ts';
import {PaymentReminderModal} from './paymentReminderModal';

const CURRENT_MONTH = new Date().getMonth();
const SCREEN_Y_OFFSET_NINETY_PERCENT = 0.9;
interface NavigationParams {
  isUserDataChanged: boolean;
}
interface props {
  navigation: {
    navigate: (routeName: String, params?: object) => void;
    goBack: () => void;
    state: {params?: {isUserDataChanged: boolean}};
    setParams: (params: NavigationParams) => void;
  };
  getUserInfoResponse: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecord: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecordResponse: object;
  getUserInfo: () => void;
  getProjectedData: (payload: object, extraPayload: object) => void;
  getProjectedDataResponse: object;
  userDataChangeEvent: object;
  triggerUserDataChange: (value: boolean) => void;
  getUserMortgageDataResponse: object;
  getUserMortgageData: (payload: object, extraPayload: object) => void;
  getUserGoal: (payload: object, extraPayload: object) => void;
  getUserGoalResponse: object;
  pushNotificationResponse: object;
  getPendingTask: (payload: object, extraPayload: object) => void;
  getPendingTaskResponse: object;
  policyUpdate: () => void;
  policyUpdateResponse: object;
  paymentReminder: () => void;
  paymentReminderResponse: object;
  paymentRescheduleReminder: (payload: object, extraPayload: object) => void;
  paymentRescheduleReminderResponse: object;
  getAllNotifications: (payload: object, extraPayload: object) => void;
  getAllNotificationsResponse: object;
  dismissSingleNotification: (payload: object, qParams: object) => void;
  dismissSingleNotificationResponse: object;
  updateNextPaymentReminderDate: (payload: object, qParams: object) => void;
  updateNextPaymentReminderDateResponse: object;
  getRemoteConfigData: (payload: object) => void;
  getRemoteConfigDataResponse: object;
}

interface state {
  isLoggedOut: boolean;
  isGoalSet: boolean;
  loading: boolean;
  isPaymentComplete: boolean;
  isPolicyUpdatePopupVisible: boolean;
  isPaymentReminderReceived: boolean;
  isModalAlertVisible: boolean;
  isPendingTaskVisible: boolean;
  nextPaymentReminderDate: string;
}
export class UnconnectedDashBoard extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      loading: !props.navigation.state.params
        ? true
        : props.navigation.state.params.isUserDataChanged,
      isPaymentComplete: false,
      isPolicyUpdatePopupVisible: true,
      isPaymentReminderReceived: false,
      isModalAlertVisible: false,
      isPendingTaskVisible: true,
      nextPaymentReminderDate: '',
    };
    StatusBar.setBackgroundColor(COLOR.DARK_BLUE, true);
  }

  setToInitialState = () => {
    this.setState({
      isLoggedOut: false,
      loading: true,
      isPaymentComplete: false,
    });
  };

  _handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === LISTENERS.APP_STATE.STATE.ACTIVE) {
      const {getUserInfoResponse, getAllNotifications} = this.props;
      const qParamNotification = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          null,
        ),
        [PAYLOAD_KEYS.NOTIFICATION.LIMIT]: 0,
      };
      await getAllNotifications({}, qParamNotification);
    }
  };

  componentDidMount = async () => {
    // this.handleInitialMount();
    this.setState({
      nextPaymentReminderDate: _get(
        this.props.getProjectedDataResponse,
        DB_KEYS.UPCOMING_PAYMENT_REMINDER_DATE,
        '',
      ),
    });
    AppState.addEventListener(
      LISTENERS.APP_STATE.CHANGE,
      this._handleAppStateChange,
    );
    this.didFocusListener = this.props.navigation.addListener(
      APP_CONSTANTS.LISTENER.DID_FOCUS,
      async () => {
        const navParam = cloneDeep(this.props.navigation.state.params);
        if (
          !navParam ||
          navParam.isUserDataChanged ||
          this.props.userDataChangeEvent.userDataChanged
        ) {
          this.setToInitialState();
          this.handleInitialMount();
          this.props.userDataChangeEvent.userDataChanged &&
            this.props.triggerUserDataChange(false);
        } else {
          StatusBar.setBackgroundColor(COLOR.DARK_BLUE, true);
          //This is added, when userDataChanged is not changed and CDM not executed
          const qParamProjectData = {
            user_id: _get(
              this.props.getUserInfoResponse,
              DB_KEYS.DATA_ID,
              null,
            ),
          };
          await this.props.getProjectedData({}, qParamProjectData);
          this.setState({
            nextPaymentReminderDate: _get(
              this.props.getProjectedDataResponse,
              DB_KEYS.UPCOMING_PAYMENT_REMINDER_DATE,
              '',
            ),
          });
        }
      },
    );
  };

  handleInitialMount = async () => {
    try {
      //Send user event to GA.
      _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
    } catch (error) {}
    // await this.props.getUserInfo();
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponse,
      getProjectedData,
      navigation,
      getUserMortgageData,
      getUserGoal,
      getPendingTask,
      getAllNotifications,
      getRemoteConfigData,
    } = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    if (!getUserInfoResponse || !userId)
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    await getRemoteConfigData({});
    const pendingTask_qParam = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getPendingTask({}, pendingTask_qParam);
    const {getUserMortgageDataResponse} = this.props;
    const qParamNotification = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
      [PAYLOAD_KEYS.NOTIFICATION.LIMIT]: 0,
    };
    await getAllNotifications({}, qParamNotification);
    if (!_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE_DATA, null)) {
      this.setState({loading: false});
      return;
    }
    const qParam_monthly_payment_record = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
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
      this.setState({loading: false});
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
        user_id: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      };
      await getProjectedData({}, qParamProjectData);
      this.setState({
        loading: false,
        nextPaymentReminderDate: _get(
          this.props.getProjectedDataResponse,
          DB_KEYS.UPCOMING_PAYMENT_REMINDER_DATE,
          '',
        ),
      });
      navigation.setParams({
        isUserDataChanged: false,
      });
    } else this.setState({loading: false});
    StatusBar.setBackgroundColor(COLOR.DARK_BLUE, true);
  };

  handleMakeOverPayment = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.OVERPAYMENT);
  };

  handleDrawer() {}

  handleLogOut = () => {};
  componentWillUnmount() {
    this.didFocusListener.remove();
    AppState.removeEventListener(
      LISTENERS.APP_STATE.CHANGE,
      this._handleAppStateChange,
    );
  }

  hanldeHomeOwnerShip = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.HOME_OWNERSHIP);
  };

  handleNotificationAction = async () => {
    const {
      dismissSingleNotification,
      getUserInfoResponse,
      paymentReminderResponse,
    } = this.props;
    const payload = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
      dismissed: true,
    };
    const qParam = {
      id: _get(
        paymentReminderResponse,
        NOTIFICATION_CONSTANTS.NOTIFCATION_STORE_ID,
        null,
      ),
    };
    await dismissSingleNotification(payload, qParam);
    const {dismissSingleNotificationResponse, getAllNotifications} = this.props;
    if (!_get(dismissSingleNotificationResponse, DB_KEYS.ERROR, true)) {
      const qParam = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          null,
        ),
        [PAYLOAD_KEYS.NOTIFICATION.LIMIT]: 0,
      };
      await getAllNotifications({}, qParam);
      this.setState({loading: false});
    }
  };

  handlePaymentFirstButton = () => {
    this.handleNotificationAction();
    this.setState({isPaymentReminderReceived: false});
    this.props.paymentReminder();
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.OVERPAYMENT);
  };

  handlePaymentSecondButton = () => {
    this.handleNotificationAction();
    this.props.paymentReminder();
    this.setState({
      isPaymentReminderReceived: false,
      isModalAlertVisible: true,
    });
  };

  remindMeLater = (timeWindowType: string) => {
    const {paymentRescheduleReminder, getUserInfoResponse} = this.props;
    this.setState(
      {
        isModalAlertVisible: false,
      },
      async () => {
        const DAY_COUNT = 1;
        const payload = {
          [PAYLOAD_KEYS.OVERPAYMENT.SCHEDULE_NOTIFICATION_TIME]: Moment()
            .add(DAY_COUNT, timeWindowType)
            .toISOString(),
        };
        const qParams = {
          [PAYLOAD_KEYS.USER_ID]: _get(
            getUserInfoResponse,
            DB_KEYS.DATA_ID,
            null,
          ),
        };
        await paymentRescheduleReminder(payload, qParams);
        const {paymentRescheduleReminderResponse} = this.props;
        if (!_get(paymentRescheduleReminderResponse, DB_KEYS.ERROR, true))
          this.setState({
            nextPaymentReminderDate: _get(
              paymentRescheduleReminderResponse,
              DB_KEYS.UPCOMING_PAYMENT_DATE_REMINDER,
              null,
            ),
          });
        showSnackBar(
          {},
          _get(
            paymentRescheduleReminderResponse,
            DB_KEYS.RESPONSE_MESSAGE,
            localeString(
              LOCALE_STRING.NOTIFICATION_PERMISSIONS.RESCHEDULED_TOMORROW,
            ),
          ),
        );
      },
    );
  };

  handleDismissAction = async () => {
    this.setState({isModalAlertVisible: false});
    const {
      updateNextPaymentReminderDate,
      getUserInfoResponse,
      getProjectedData,
      getRemoteConfigDataResponse,
    } = this.props;
    let currentDate = Moment().format(APP_CONSTANTS.DATE_FORMAT);
    let defaultReminderDate = Moment()
      .add(1, 'month')
      .date(
        _get(
          getRemoteConfigDataResponse,
          DB_KEYS.PAYMENT_REMINDER_DATE_OF_MONTH,
          LOCAL_KEYS.DEFAULT_REMINDER_DAY_OF_MONTH,
        ),
      )
      .format();
    const payload = {
      upcoming_payment_reminder_date: defaultReminderDate,
    };
    const qParams = {
      current_date: currentDate,
      user_id: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
    };
    await updateNextPaymentReminderDate(payload, qParams);
    const {updateNextPaymentReminderDateResponse} = this.props;
    if (!_get(updateNextPaymentReminderDateResponse, DB_KEYS.ERROR, true)) {
      this.setState({
        nextPaymentReminderDate: _get(
          updateNextPaymentReminderDateResponse,
          DB_KEYS.UPCOMING_PAYMENT_DATE_REMINDER,
          null,
        ),
      });
    }
  };

  onCloseToBottom = (nativeEvent: {
    layoutMeasurement: object;
    contentOffset: object;
    contentSize: object;
  }) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    if (
      _get(layoutMeasurement, NATIVE_EVENTS.HEIGHT, 0) +
        _get(contentOffset, NATIVE_EVENTS.Y_OFFSET, 0) >=
      SCREEN_Y_OFFSET_NINETY_PERCENT *
        _get(contentSize, NATIVE_EVENTS.HEIGHT, 0)
    ) {
      this.setState({isPendingTaskVisible: false});
    } else this.setState({isPendingTaskVisible: true});
  };

  getNthDateSuffix = (date: number) => {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  render() {
    const {
      getMonthlyPaymentRecordResponse,
      getProjectedDataResponse,
      getUserMortgageDataResponse,
      getUserGoalResponse,
      pushNotificationResponse,
      navigation,
      getPendingTaskResponse,
      getAllNotificationsResponse,
    } = this.props;
    const upcomingPaymentDate = Moment(
      this.state.nextPaymentReminderDate,
    ).date();
    const upcomingPaymentMonth =
      APP_CONSTANTS.MONTH_NAMES[
        Moment(this.state.nextPaymentReminderDate).month()
      ];
    console.log('Inside Dashboard Render');
    const balanceAmount = _get(
      getMonthlyPaymentRecordResponse,
      DB_KEYS.BALANCE_AMOUNT,
      null,
    );
    const monthlyTarget = _get(
      getMonthlyPaymentRecordResponse,
      DB_KEYS.MONTHLY_TARGET,
      0,
    );
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
    const isUpdatedAndGoalNotSet =
      !monthlyOverPayment && mortgageTerm === APP_CONSTANTS.MIN_GOAL_VALUE;
    const monthlyTargetWithCommas = getNumberWithCommas(
      Math.round(monthlyTarget),
    );
    const balanceAmountWithCommas = getNumberWithCommas(
      Math.round(balanceAmount),
    );
    const estimatedMonths = _get(
      getProjectedDataResponse,
      DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_MONTHS,
      '-',
    );
    const extimatedYears = _get(
      getProjectedDataResponse,
      DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_YEARS,
      '-',
    );
    const activeNotificationCount = _get(
      getAllNotificationsResponse,
      DB_KEYS.META_TOTAL,
      0,
    );
    if (
      this.state.loading ||
      _get(pushNotificationResponse, DB_KEYS.IS_FETCHING, false)
    )
      return <LoadingModal loadingText="Loading..." />;
    else
      return (
        <View>
          <ScrollView
            contentContainerStyle={styles.middleContainer}
            showsVerticalScrollIndicator={false}
            onScroll={({nativeEvent}) => this.onCloseToBottom(nativeEvent)}>
            <GeneralStatusBar
              backgroundColor={COLOR.DARK_BLUE}
              barStyle="light-content"
            />
            <ImageBackground
              source={dashBoardCard}
              style={styles.blueImageBackground}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(
                    NAVIGATION_SCREEN_NAME.NOTIFICATION_SCREEN,
                  )
                }
                style={styles.supportIcon}>
                {activeNotificationCount ? (
                  <View style={styles.badgeContainer}>
                    {/* This is to be replaced by actual count */}
                    <Text style={styles.badgeCountText}>
                      {activeNotificationCount >
                      NOTIFICATION_CONSTANTS.MAX_NOTIFICATION_COUNT
                        ? NOTIFICATION_CONSTANTS.NOTIFICATION_COUNT
                        : activeNotificationCount}
                    </Text>
                  </View>
                ) : null}
                <Image source={iNotification_message} />
              </TouchableOpacity>
              <Text style={styles.thisMonthText}>
                {localeString(LOCALE_STRING.DASHBOARD_SCREEN.THIS_MONTH)}
              </Text>
              <View style={styles.targetAmountContainer}>
                <Text
                  style={[
                    styles.overPaymentTargetAmount,
                    {
                      color: !balanceAmount ? COLOR.SHADED_GREEN : COLOR.WHITE,
                    },
                  ]}>
                  £{monthlyTargetWithCommas}
                </Text>
                {!balanceAmount && (
                  <View style={styles.targetTextContainer}>
                    <View style={styles.paidButton}>
                      <Text style={{color: COLOR.WHITE}}>Paid</Text>
                    </View>
                  </View>
                )}
              </View>
              <Text style={styles.overPaymentTargetText}>
                {APP_CONSTANTS.FULL_MONTH_NAMES[CURRENT_MONTH] +
                  ' ' +
                  new Date().getFullYear()}
              </Text>
              {balanceAmount === 0 ? (
                <Text style={styles.dueReminderText}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.KEEP_IT_UP)}
                </Text>
              ) : (
                <Text style={styles.dueReminderText}>
                  {balanceAmount > 0 && balanceAmount < monthlyTarget
                    ? `Stay on track. £${balanceAmountWithCommas} to go!`
                    : localeString(
                        LOCALE_STRING.DASHBOARD_SCREEN.PAYMENT_REMINDER,
                        {
                          month: upcomingPaymentMonth,
                          date:
                            upcomingPaymentDate +
                            this.getNthDateSuffix(upcomingPaymentDate),
                        },
                      )}
                </Text>
              )}
            </ImageBackground>
            <Button
              title={localeString(
                LOCALE_STRING.DASHBOARD_SCREEN.MAKE_OVERPAYMENT,
              )}
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => this.handleMakeOverPayment()}
            />
            <PaymentProgressCard
              navigation={navigation}
              currentMonthTarget={monthlyTarget}
            />
            <ImageBackground
              source={homeOwnershipCard}
              resizeMode="stretch"
              style={styles.bottomCardOuterStyle}
              imageStyle={styles.bottomCardInnerStyle}>
              <TouchableOpacity
                onPress={() => this.hanldeHomeOwnerShip()}
                hitSlop={APP_CONSTANTS.HIT_SLOP}
                style={styles.homeOwnerShipCardContainer}>
                <View>
                  <Text style={styles.ownerShipText}>
                    {localeString(LOCALE_STRING.HOME_OWNERSHIP.HOME_OWNERSHIP)}
                  </Text>
                  <Text style={styles.ownerShipText}>
                    {localeString(LOCALE_STRING.HOME_OWNERSHIP.JOURNEY)}
                  </Text>
                </View>
                <View style={styles.viewContainer}>
                  <Text style={styles.viewText}>
                    {localeString(LOCALE_STRING.HOME_OWNERSHIP.VIEW)}
                  </Text>
                  <Image source={iViewArrow} />
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </ScrollView>
          {(!_get(
            getMonthlyPaymentRecordResponse,
            DB_KEYS.RESPONSE_DATA,
            null,
          ) ||
            isUpdatedAndGoalNotSet) && (
            <StatusOverlay
              icon={correct}
              firstButtonText={localeString(
                LOCALE_STRING.SET_GOAL_SCREEN.TITLE,
              )}
              handleFirstButton={() =>
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN,
                )
              }
              mainMessage={localeString(LOCALE_STRING.STATUS_OVERLAY.OH_NO)}
              infoTitle={
                isUpdatedAndGoalNotSet
                  ? localeString(LOCALE_STRING.STATUS_OVERLAY.MORTGAGE_UPDATED)
                  : localeString(LOCALE_STRING.STATUS_OVERLAY.MESSAGE)
              }
            />
          )}
          {!_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE_DATA, null) && (
            <StatusOverlay
              icon={correct}
              firstButtonText={localeString(
                LOCALE_STRING.SET_GOAL_SCREEN.TITLE_MORTGAGE,
              )}
              handleFirstButton={() =>
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.UPDATE_MORTGAGE,
                )
              }
              mainMessage={localeString(LOCALE_STRING.STATUS_OVERLAY.OH_NO)}
              infoTitle={localeString(
                LOCALE_STRING.STATUS_OVERLAY.MESSAGE_MORTGAGE,
              )}
            />
          )}
          {_get(
            this.props.paymentReminderResponse,
            DB_KEYS.IS_PAYMENT_REMINDER_RECEIVED,
            false,
          ) && (
            <StatusOverlay
              icon={questionMark}
              firstButtonText={localeString(
                LOCALE_STRING.PAYMENT_REMINDER.PAY_NOW,
              )}
              secondButtonText={localeString(
                LOCALE_STRING.PAYMENT_REMINDER.REMIND_ME_LATER,
              )}
              handleFirstButton={() => this.handlePaymentFirstButton()}
              handleSecondButton={() => this.handlePaymentSecondButton()}
              mainMessageStyle={styles.mainMessageStyle}
              infoTitle={localeString(
                LOCALE_STRING.PAYMENT_REMINDER.STAY_ON_TRACK_MORTGAGE,
              )}
              mainMessage={`£${balanceAmountWithCommas}`} //To be fetched from payment pending
            />
          )}
          <PaymentReminderModal
            isVisible={this.state.isModalAlertVisible}
            handleDismiss={() => this.handleDismissAction()}
            monthlyTarget={monthlyTargetWithCommas}
            remindeMeTomorrow={() => this.remindMeLater('days')}
            remindeMeNextWeek={() => this.remindMeLater('weeks')}
          />
          {_get(
            this.props.policyUpdateResponse,
            DB_KEYS.IS_POLICY_UPDATE_RECEIVED,
            false,
          ) && (
            <PolicyUpdate
              navigation={navigation}
              policyUpdate={this.props.policyUpdate}
            />
          )}
          {/* Condition to be added */}
          {_get(
            getPendingTaskResponse,
            DB_KEYS.PENDING_TASK.IS_PENDING_TASK,
            false,
          ) && this.state.isPendingTaskVisible ? (
            /*
            NOTES : This condition is to show/hide pendingTask popup
            */
            <PendingTaskDrawer navigation={navigation} />
          ) : null}
        </View>
      );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getMonthlyPaymentRecordResponse: state.getMonthlyPaymentRecord,
  getProjectedDataResponse: state.getProjectedData,
  userDataChangeEvent: state.userDataChangeReducer,
  getUserMortgageDataResponse: state.getUserMortgageData,
  getUserGoalResponse: state.getUserGoal,
  pushNotificationResponse: state.pushNotification,
  getPendingTaskResponse: state.getPendingTask,
  policyUpdateResponse: state.policyUpdate,
  paymentReminderResponse: state.paymentReminder,
  paymentRescheduleReminderResponse: state.paymentRescheduleReminder,
  getAllNotificationsResponse: state.getAllNotifications,
  dismissSingleNotificationResponse: state.dismissSingleNotification,
  updateNextPaymentReminderDateResponse: state.updateNextPaymentReminderDate,
  getRemoteConfigDataResponse: state.getRemoteConfigData,
});

const bindActions = dispatch => ({
  getMonthlyPaymentRecord: (payload, extraPayload) =>
    dispatch(getMonthlyPaymentRecord.fetchCall(payload, extraPayload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  getProjectedData: (payload, extraPayload) =>
    dispatch(getProjectedData.fetchCall(payload, extraPayload)),
  triggerUserDataChange: value => dispatch(triggerUserDataChangeEvent(value)),
  getUserMortgageData: (payload, extraPayload) =>
    dispatch(getUserMortgageData.fetchCall(payload, extraPayload)),
  getUserGoal: (payload, extraPayload) =>
    dispatch(getUserGoal.fetchCall(payload, extraPayload)),
  getPendingTask: (payload, extraPayload) =>
    dispatch(getPendingTask.fetchCall(payload, extraPayload)),
  policyUpdate: () => dispatch(policyUpdate()),
  paymentReminder: () => dispatch(paymentReminder()),
  paymentRescheduleReminder: (payload, extraPayload) =>
    dispatch(paymentRescheduleReminder.fetchCall(payload, extraPayload)),
  getAllNotifications: (payload, extraPayload) =>
    dispatch(getAllNotifications.fetchCall(payload, extraPayload)),
  dismissSingleNotification: (payload, extraPayload) =>
    dispatch(dismissSingleNotification.fetchCall(payload, extraPayload)),
  updateNextPaymentReminderDate: (payload, extraPayload) =>
    dispatch(updateNextPaymentReminderDate.fetchCall(payload, extraPayload)),
  getRemoteConfigData: payload =>
    dispatch(getRemoteConfigData.fetchCall(payload)),
});

export const DashBoard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);

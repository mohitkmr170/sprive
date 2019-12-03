import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {
  dashBoardCard,
  report,
  plusIncome,
  minusIncome,
  correct,
} from '../../assets';
import {connect} from 'react-redux';
import {
  StackBarGraph,
  StatusOverlay,
  LoadingModal,
  GeneralStatusBar,
} from '../../components';
import * as Progress from 'react-native-progress';
import {get as _get, cloneDeep} from 'lodash';
import {localeString} from '../../utils/i18n';
import {
  getMonthlyPaymentRecord,
  getUserInfo,
  getProjectedData,
  getUserMortgageData,
  getUserGoal,
} from '../../store/reducers';
import {
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  APP_CONSTANTS,
  DB_KEYS,
} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';
import {getNumberWithCommas} from '../../utils/helperFunctions';
import {triggerUserDataChangeEvent} from '../../store/actions/user-date-change-action.ts';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';

const CURRENT_MONTH = new Date().getMonth();
interface NavigationParams {
  isUserDataChanged: boolean;
}
interface props {
  navigation: {
    navigate: (routeName: String) => void;
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
}

interface state {
  isLoggedOut: boolean;
  isGoalSet: boolean;
  loading: boolean;
  isPaymentComplete: boolean;
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
    };
  }

  setToInitialState = () => {
    this.setState({
      isLoggedOut: false,
      loading: true,
      isPaymentComplete: false,
    });
  };

  componentDidMount = async () => {
    // this.handleInitialMount();
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
        }
        //Send user event to GA.
        _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
      },
    );

    //Send user event to GA.
    _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
  };

  handleInitialMount = async () => {
    // await this.props.getUserInfo();
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponse,
      getProjectedData,
      navigation,
      getUserMortgageData,
      getUserGoal,
    } = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    if (!getUserInfoResponse || !userId)
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const {getUserMortgageDataResponse} = this.props;
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
      this.setState({loading: false});
      navigation.setParams({
        isUserDataChanged: false,
      });
    } else this.setState({loading: false});
  };

  handleMakeOverPayment = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.OVERPAYMENT);
  };

  handleDrawer() {}

  handleLogOut = () => {};
  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const {
      getMonthlyPaymentRecordResponse,
      getProjectedDataResponse,
      getUserMortgageDataResponse,
      getUserGoalResponse,
    } = this.props;
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
    if (this.state.loading) return <LoadingModal loadingText="Loading..." />;
    else
      return (
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.middleContainer}
            showsVerticalScrollIndicator={false}>
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
                    NAVIGATION_SCREEN_NAME.REPORT_ISSUE,
                  )
                }
                style={styles.supportIcon}>
                <Image source={report} />
              </TouchableOpacity>
              <Text style={styles.thisMonthText}>
                {localeString(LOCALE_STRING.DASHBOARD_SCREEN.THIS_MONTH)}
              </Text>
              <View style={{flexDirection: 'row'}}>
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
                  <View style={styles.paidButton}>
                    <Text style={{color: COLOR.WHITE}}>Paid</Text>
                  </View>
                )}
              </View>
              <Text style={styles.overPaymentTargetText}>
                {localeString(LOCALE_STRING.DASHBOARD_SCREEN.OVER_PAYMENT)}
              </Text>
              {balanceAmount === 0 ? (
                <Text style={styles.dueReminderText}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.KEEP_IT_UP)}
                </Text>
              ) : (
                <Text style={styles.dueReminderText}>
                  {balanceAmount > 0 && balanceAmount < monthlyTarget
                    ? `£${balanceAmountWithCommas} more to go!`
                    : localeString(
                        LOCALE_STRING.DASHBOARD_SCREEN.PAYMENT_REMINDER,
                        {month: APP_CONSTANTS.MONTH_NAMES[CURRENT_MONTH]},
                      )}
                </Text>
              )}
            </ImageBackground>
            <View style={styles.secondContainer}>
              <View style={styles.statusContainer}>
                <Text style={styles.statusLefttext}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.AMOUNT_LEFT)}{' '}
                  <Text style={styles.innerFirstText}>£2,880</Text>
                </Text>
                <Text style={styles.statusRightText}>
                  Spent £560 out of £3,440
                </Text>
              </View>
              <View style={styles.passStrengthInnerContainer}>
                <Progress.Bar
                  progress={0.6}
                  color={COLOR.DARKEST_YELLOW}
                  height={10}
                  width={null}
                  borderRadius={5}
                  unfilledColor={COLOR.LIGHTEST_YELLOW}
                  borderWidth={0}
                />
              </View>
            </View>
            <View style={styles.incomeStatusContainer}>
              <View style={styles.incomeInnerContainer}>
                <View style={styles.rowParentContainer}>
                  <View style={styles.incomeInnerContainers}>
                    <View style={styles.rowParentContainer}>
                      <Image source={plusIncome} height={18} width={18} />
                      <Text style={styles.incomeText}>
                        {localeString(LOCALE_STRING.DASHBOARD_SCREEN.INCOME)}
                      </Text>
                    </View>
                    <Text style={styles.incomeSpentText}>£3,440</Text>
                  </View>
                  <View style={styles.incomeInnerContainers}>
                    <View style={styles.rowParentContainer}>
                      <Image source={minusIncome} height={18} width={18} />
                      <Text style={styles.spentText}>
                        {localeString(LOCALE_STRING.DASHBOARD_SCREEN.SPENT)}
                      </Text>
                    </View>
                    <Text style={styles.incomeSpentText}>£3,440</Text>
                  </View>
                </View>
                <Text style={styles.availableBalanceText}>
                  {localeString(
                    LOCALE_STRING.DASHBOARD_SCREEN.AVAILABLE_BALANCE,
                  )}
                </Text>
                <Text style={styles.availableAmountText}>£21,312</Text>
                <Button
                  title={localeString(
                    LOCALE_STRING.DASHBOARD_SCREEN.MAKE_OVERPAYMENT,
                  )}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.button}
                  onPress={() => this.handleMakeOverPayment()}
                />
              </View>
            </View>
            <View>
              <View style={styles.myProgressContainer}>
                <Text style={styles.myProgressText}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.MY_PROGRESS)}
                </Text>
                <Text style={styles.projectedText}>
                  {localeString(
                    LOCALE_STRING.DASHBOARD_SCREEN.PROJECTED_MORTGAGE,
                  )}{' '}
                  <Text style={styles.monthsLeftText}>
                    {extimatedYears
                      ? extimatedYears +
                        (extimatedYears === 1 ? ' year' : ' years')
                      : ''}{' '}
                    {estimatedMonths
                      ? estimatedMonths +
                        (estimatedMonths === 1 ? ' month' : ' months')
                      : ''}
                    {!estimatedMonths && !extimatedYears && '-'}
                  </Text>
                </Text>
              </View>
              <StackBarGraph currentMonthTarget={monthlyTarget} />
            </View>
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
});

export const DashBoard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);

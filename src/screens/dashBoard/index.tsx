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
import {get as _get} from 'lodash';
import {localeString} from '../../utils/i18n';
import {
  getMonthlyPaymentRecord,
  getUserInfo,
  getProjectedData,
} from '../../store/reducers';
import {
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  APP_CONSTANTS,
  DB_KEYS,
} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getUserInfoResponse: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecord: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecordResponse: object;
  getUserInfo: () => void;
  getProjectedData: (payload: object, extraPayload: object) => void;
  getProjectedDataResponse: object;
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
      loading: true,
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
    this.handleInitialMount();
    this.didFocusListener = this.props.navigation.addListener(
      APP_CONSTANTS.LISTENER.DID_FOCUS,
      async () => {
        this.setToInitialState();
        this.handleInitialMount();
      },
    );
  };

  handleInitialMount = async () => {
    await this.props.getUserInfo();
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponse,
      getProjectedData,
    } = this.props;
    const qParam = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.GRAPH.CURRENT_DATE]: new Date().toISOString(),
    };
    await getMonthlyPaymentRecord({}, qParam);
    const qParamProjectData = {
      user_id: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
    };
    await getProjectedData({}, qParamProjectData);
    this.setState({loading: false});
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
    const estimatedMonths = _get(
      getProjectedDataResponse,
      DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_MONTHS,
      '',
    );
    const extimatedYears = _get(
      getProjectedDataResponse,
      DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_YEARS,
      '',
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
              <TouchableOpacity onPress={() => {}} style={styles.supportIcon}>
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
                  £{Math.round(monthlyTarget)}
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
                    ? `£${balanceAmount} more to go!`
                    : localeString(
                        LOCALE_STRING.DASHBOARD_SCREEN.PAYMENT_REMINDER,
                      )}
                </Text>
              )}
            </ImageBackground>
            <View style={styles.secondContainer}>
              <View style={styles.statusContainer}>
                <Text style={styles.statusLefttext}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.AMOUNT_LEFT)}{' '}
                  <Text style={styles.innerFirstText}>£2880</Text>
                </Text>
                <Text style={styles.statusRightText}>
                  Spent £560 out of £3440
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
                    {extimatedYears ? extimatedYears + 'yr' : ''}{' '}
                    {estimatedMonths ? estimatedMonths + 'm' : ''}
                  </Text>
                </Text>
              </View>
              <StackBarGraph currentMonthTarget={monthlyTarget} />
            </View>
          </ScrollView>
          {_get(getMonthlyPaymentRecordResponse, DB_KEYS.ERROR, true) && (
            <StatusOverlay
              icon={correct}
              firstButtonText="Set Goal"
              handleFirstButton={() =>
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN,
                )
              }
              mainMessage="Oh no!"
              infoTitle="Goal not set, please go ahead and set your goal to see your Dashboard"
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
});

const bindActions = dispatch => ({
  getMonthlyPaymentRecord: (payload, extraPayload) =>
    dispatch(getMonthlyPaymentRecord.fetchCall(payload, extraPayload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  getProjectedData: (payload, extraPayload) =>
    dispatch(getProjectedData.fetchCall(payload, extraPayload)),
});

export const DashBoard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);

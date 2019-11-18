import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {dashBoardCard, report, plusIncome, minusIncome} from '../../assets';
import {connect} from 'react-redux';
import {StackBarGraph, StatusOverlay, LoadingModal} from '../../components';
import * as Progress from 'react-native-progress';
import {get as _get} from 'lodash';
import {localeString} from '../../utils/i18n';
import {getMonthlyPaymentRecord, getGraphData} from '../../store/reducers';
import {
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  APP_CONSTANTS,
  LOCALE_STRING,
} from '../../utils/constants';
import {COLOR} from '../../utils/colors';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getUserInfoResponse: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecord: (payload: object, extraPayload: object) => void;
  getGraphData: () => void;
  getMonthlyPaymentRecordResponse: object;
  getGraphDataResponse: object;
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

  UNSAFE_componentWillMount = async () => {
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponse,
      getMonthlyPaymentRecordResponse,
    } = this.props;
    const qParam = {
      user_id: _get(getUserInfoResponse, 'response.data.id', null),
    };
    await getMonthlyPaymentRecord({}, qParam);
    console.log(
      'UNSAFE_componentWillMount : getMonthlyPaymentRecordResponse =>',
      getMonthlyPaymentRecordResponse,
    );
    this.setState({loading: false});
  };

  handleDrawer() {}

  handleLogOut = () => {
    //to be removed
    this.props.navigation.openDrawer();
    // const {getUserInfoResponse} = this.props;
    // setAuthToken(
    //   APP_CONSTANTS.FALSE_TOKEN,
    //   _get(getUserInfoResponse, DB_KEYS.CURRENT_USER_EMAIL, ''),
    // )
    //   .then(response => {
    //     // showSnackBar(APP_CONSTANTS.LOG_OUT);
    //     this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    //   })
    //   .catch(error => {
    //     showSnackBar(APP_CONSTANTS.GENERAL_ERROR);
    //   });
  };

  render() {
    const {getMonthlyPaymentRecordResponse} = this.props;
    const balanceAmount = _get(
      getMonthlyPaymentRecordResponse,
      'response.data.balance_amount',
      0,
    );
    const monthlyTarget = _get(
      getMonthlyPaymentRecordResponse,
      'response.data.monthly_target',
      0,
    );
    const {isPaymentComplete} = this.state;
    if (this.state.loading)
      return (
        <View style={{flex: 1}}>
          <LoadingModal loadingText="Loading..." />
        </View>
      );
    else
      return (
        <View style={styles.mainContainer}>
          {/* /*
        TODO : Uncomment it
        */}

          <ScrollView
            contentContainerStyle={styles.middleContainer}
            showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={dashBoardCard}
              style={styles.blueImageBackground}>
              <TouchableOpacity
                onPress={() => {
                  /*
                TODO : Temporarily Logout on this button, have to be moved
                */
                  this.setState({isLoggedOut: true});
                  this.handleLogOut();
                }}
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
                      color:
                        balanceAmount === 0
                          ? 'rgba(160, 255, 216, 1)'
                          : COLOR.WHITE,
                    },
                  ]}>
                  £ {Math.round(monthlyTarget)}
                </Text>
                {balanceAmount === 0 && (
                  <View
                    style={{
                      height: 24,
                      width: 40,
                      backgroundColor: '#4D56B1',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: 16,
                      marginLeft: 16,
                      borderRadius: 14,
                    }}>
                    <Text style={{color: 'white'}}>Paid</Text>
                  </View>
                )}
              </View>
              <Text style={styles.overPaymentTargetText}>
                {localeString(LOCALE_STRING.DASHBOARD_SCREEN.OVER_PAYMENT)}
              </Text>
              {balanceAmount === 0 ? (
                <Text style={styles.dueReminderText}>
                  You’re on track. Keep it up
                </Text>
              ) : (
                <Text style={styles.dueReminderText}>
                  {balanceAmount > 0 && balanceAmount < monthlyTarget
                    ? localeString(
                        LOCALE_STRING.DASHBOARD_SCREEN.PAYMENT_REMINDER,
                      )
                    : `£ ${balanceAmount} more to go!`}
                </Text>
              )}
            </ImageBackground>
            <View style={styles.secondContainer}>
              <View style={styles.statusContainer}>
                <Text style={styles.statusLefttext}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.AMOUNT_LEFT)}{' '}
                  <Text style={styles.innerFirstText}>£ 2880</Text>
                </Text>
                <Text style={styles.statusRightText}>
                  {/* /*
              TODO : Will be moved to locales after data model
              */}
                  Spent £ 560 out of £ 3440
                </Text>
              </View>
              <View style={styles.passStrengthInnerContainer}>
                <Progress.Bar
                  progress={0.6}
                  color="#FF9D00"
                  height={10}
                  width={null}
                  borderRadius={5}
                  unfilledColor="#FFE9B3"
                  borderWidth={0}
                />
              </View>
            </View>
            {/* Shadow effect is to be enhanced further */}
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
                <Text style={styles.availableAmountText}>£ 21,312</Text>
                <Button
                  title={localeString(
                    LOCALE_STRING.DASHBOARD_SCREEN.MAKE_OVERPAYMENT,
                  )}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.button}
                />
              </View>
            </View>
            {/* View for graph */}
            <View>
              <View style={styles.myProgressContainer}>
                <Text style={styles.myProgressText}>
                  {localeString(LOCALE_STRING.DASHBOARD_SCREEN.MY_PROGRESS)}
                </Text>
                <Text style={styles.projectedText}>
                  {localeString(
                    LOCALE_STRING.DASHBOARD_SCREEN.PROJECTED_MORTGAGE,
                  )}{' '}
                  <Text style={styles.monthsLeftText}>3yr 11m</Text>
                </Text>
              </View>
              <StackBarGraph />
            </View>
          </ScrollView>
          {_get(getMonthlyPaymentRecordResponse, 'error', true) && (
            <StatusOverlay
              handleContinue={() =>
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN,
                )
              }
            />
          )}
        </View>
      );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getMonthlyPaymentRecordResponse: state.getMonthlyPaymentRecord,
  getGraphDataResponse: state.getGraphData,
});

const bindActions = dispatch => ({
  getMonthlyPaymentRecord: (payload, extraPayload) =>
    dispatch(getMonthlyPaymentRecord.fetchCall(payload, extraPayload)),
  getGraphData: (payload, extraPayload) =>
    dispatch(getGraphData.fetchCall(payload, extraPayload)),
});

export const DashBoard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);

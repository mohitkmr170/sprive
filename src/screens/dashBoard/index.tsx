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
import {dashBoardCard, report, plusIncome, minusIncome} from '../../assets';
import {connect} from 'react-redux';
import {StackBarGraph, StatusOverlay} from '../../components';
import * as Progress from 'react-native-progress';
import {get as _get} from 'lodash';
import {localeString} from '../../utils/i18n';
import {setAuthToken, showSnackBar} from '../../utils/helperFunctions';
import {
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  APP_CONSTANTS,
  LOCALE_STRING,
} from '../../utils/constants';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getUserInfoResponse: () => void;
}

interface state {
  isLoggedOut: boolean;
  isGoalSet: boolean;
}
export class UnconnectedDashBoard extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      isGoalSet: true,
    };
  }

  handleLogOut = () => {
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
    return (
      <View style={styles.mainContainer}>
        {!this.state.isGoalSet && (
          <StatusOverlay
            handleContinue={() =>
              this.props.navigation.navigate(
                NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN,
              )
            }
          />
        )}
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
              <Text style={styles.overPaymentTargetAmount}>£175</Text>
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
            </View>
            <Text style={styles.overPaymentTargetText}>
              {localeString(LOCALE_STRING.DASHBOARD_SCREEN.OVER_PAYMENT)}
            </Text>
            <Text style={styles.dueReminderText}>
              {localeString(LOCALE_STRING.DASHBOARD_SCREEN.PAYMENT_REMINDER)}
            </Text>
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
                  <Text style={styles.incomeSpentText}>£3,440.00</Text>
                </View>
                <View style={styles.incomeInnerContainers}>
                  <View style={styles.rowParentContainer}>
                    <Image source={minusIncome} height={18} width={18} />
                    <Text style={styles.spentText}>
                      {localeString(LOCALE_STRING.DASHBOARD_SCREEN.SPENT)}
                    </Text>
                  </View>
                  <Text style={styles.incomeSpentText}>£3,440.00</Text>
                </View>
              </View>
              <Text style={styles.availableBalanceText}>
                {localeString(LOCALE_STRING.DASHBOARD_SCREEN.AVAILABLE_BALANCE)}
              </Text>
              <Text style={styles.availableAmountText}>£ 21,312.00</Text>
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = () => ({});

export const DashBoard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);

import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {Header, GeneralStatusBar} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {localeString} from '../../utils/i18n';
import {get as _get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {interestBanner} from '../../assets';
import {getUserInfo, setUserMortgage} from '../../store/reducers';
import {
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  DB_KEYS,
  APP_CONSTANTS,
} from '../../utils/constants';
import {
  getNumberWithCommas,
  getAuthToken,
  showSnackBar,
} from '../../utils/helperFunctions';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';
import {COLOR} from '../../utils/colors';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getCumulativeInterestResponse: object;
  getUserInfo: () => void;
  getUserInfoResponse: object;
  reducerResponse: object;
  setUserMortgage: (payload: object) => void;
  setUserMortgageResponse: object;
}

interface state {}

class UnconnectedSaveInterest extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
    try {
      //Send user event to GA.
      _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.SAVE_INTEREST_SCREEN);
    } catch (error) {}
  };

  handlebackPress = () => {
    this.props.navigation.goBack();
  };

  handleSaveWithSprive = async () => {
    // const {getUserInfo, reducerResponse} = this.props;
    // getAuthToken()
    //   .then(async res => {
    //     console.log('handleSaveWithSprive:: getAuthToken::  res-->', res);
    //     if(!res){
    //       // CASE-: Token Error, Token Not found
    //       // HANDLE-: Route to SignUp Screen
    //       this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
    //       return;
    //     }
    //     const {getUserInfoResponse, setUserMortgage} = this.props;
    //     if (_get(getUserInfoResponse, DB_KEYS.AUTH_STATUS, false)) {
    //       //set Mortgage
    //       const mortgageData = {
    //         mortgage_balance: _get(
    //           reducerResponse,
    //           DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT,
    //           '',
    //         ).replace(/,/g, ''),
    //         mortgage_term: _get(
    //           reducerResponse,
    //           DB_KEYS.FORM_MORTGAGE_TIMEPERIOD,
    //           '',
    //         ).replace(/,/g, ''),
    //         mortgage_payment: _get(
    //           reducerResponse,
    //           DB_KEYS.FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT,
    //           '',
    //         ).replace(/,/g, ''),
    //         user_id: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
    //       };
    //       await setUserMortgage(mortgageData);
    //       const {setUserMortgageResponse} = this.props;
    //       if (_get(setUserMortgageResponse, DB_KEYS.RESPONSE_DATA, null)) {
    //         // CASE-: Token Sucess, Set-User-Mortgage Success
    //         // HANDLE-: Route to Set Goal Screen
    //         this.props.navigation.navigate(
    //           NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN,
    //         );
    //       }
    //     } else{
    //       // CASE-: Token Error, Invalid or expired
    //       // HANDLE-: Route to Login Screen
    //       this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    //     }
    //   })
    //   .catch(err => {
    //     // CASE-: Token Error, KeyChain Corrupted or couldn't be fetched
    //     // HANDLE-: Route to SignUp Screen
    //   });
    getAuthToken()
      .then(async res => {
        const {getUserInfo} = this.props;
        /*
        NOTES : This condition is added to handle concurrent device login for unverified user
        */

        console.log('AUTH_TOKE_IN_SAVE_INTEREST :::', res);
        if (res && res !== APP_CONSTANTS.FALSE_TOKEN) {
          await getUserInfo();
          const {getUserInfoResponse} = this.props;
          if (!_get(getUserInfoResponse, DB_KEYS.ERROR, true))
            this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
          else
            this.props.navigation.navigate(
              NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN,
            );
        } else
          this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
      })
      .catch(err => showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR));
  };

  render() {
    const {getCumulativeInterestResponse} = this.props;
    let cumulativeInterest = Math.ceil(
      _get(getCumulativeInterestResponse, DB_KEYS.TOTAL_INTEREST, 0),
    );
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handlebackPress()} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.topContainer}>
          <Image source={interestBanner} style={styles.imageBackgoundStyle} />
          <Text style={styles.cardText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.CARD_TEXT)}
          </Text>
          <Text style={styles.cardInterestText}>
            £{getNumberWithCommas(String(cumulativeInterest))}
          </Text>
          <Text style={styles.saveMoneyText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_MONEY)}
          </Text>
        </KeyboardAwareScrollView>
        <Button
          title={localeString(
            LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_BUTTON_TEXT,
          )}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => this.handleSaveWithSprive()}
          loading={_get(setUserMortgage, DB_KEYS.IS_FETCHING, false)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getCumulativeInterestResponse: state.getCumulativeInterest,
  getUserInfoResponse: state.getUserInfo,
  reducerResponse: state.form,
  setUserMortgageResponse: state.setUserMortgage,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  setUserMortgage: payload => dispatch(setUserMortgage.fetchCall(payload)),
});

export const SaveInterest = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSaveInterest);

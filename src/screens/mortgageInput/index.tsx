import React from 'react';
import {View, Text, Alert, StatusBar} from 'react-native';
import {styles} from './styles';
import {
  Header,
  MortgageInputContainer,
  GeneralStatusBar,
} from '../../components';
import {
  localeString,
  _gaSetCurrentScreen,
  showSnackBar,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  APP_CONSTANTS,
  LOCALE_STRING,
  PAYLOAD_KEYS,
  COLOR,
} from '../../utils';
import {Button} from 'react-native-elements';
import {reset as resetNavigation} from '../../navigation/navigationService';
import {getCumulativeInterest} from '../../store/reducers';
import {reduxForm, reset} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  getCumulativeInterest: (payload: object) => void;
  getCumulativeInterestResponse: () => void;
  handleSubmit: (firstParam: (values: object) => void) => void;
  reducerResponse: object;
}

interface state {
  enableButton: boolean;
  serverError: boolean;
}

export class UnconnectedMortgageInput extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      enableButton: true,
      serverError: false,
    };
    StatusBar.setHidden(false, 'fade');
    this.handlePayNowVisibility = this.handlePayNowVisibility.bind(this);
    StatusBar.setBackgroundColor(COLOR.WHITE);
  }
  componentDidMount() {
    const {reducerResponse} = this.props;
    const isButtonDisabled =
      _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT, null) &&
      _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_TIMEPERIOD, null) &&
      _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT, null)
        ? true
        : false;
    this.setState({enableButton: !isButtonDisabled});
    // this.didFocusListener = this.props.navigation.addListener(
    //   APP_CONSTANTS.LISTENER.DID_FOCUS,
    //   async () => {
    //     this.props.reset(APP_CONSTANTS.MORTGAGE_INPUT_FORM);
    //   },
    // );
    try {
      //Send user event to GA.
      _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
    } catch (error) {}
  }

  showServerError = () => {
    this.setState({
      serverError: true,
    });
  };
  hideServerError = () => {
    this.setState({
      serverError: false,
    });
  };
  // Back Icon Pressed
  handleBackPress = () => {
    resetNavigation(NAVIGATION_SCREEN_NAME.INTRO_CAROUSEL);
  };
  // Funtion to toggle the visibility of the submit buttons
  handlePayNowVisibility() {
    this.setState({enableButton: false});
  }
  componentWillUnmount() {
    // this.didFocusListener.remove();
  }
  /**
   *
   * @param values : object : object with all form values
   */
  handleSetMortgage = async (values: object) => {
    console.log(
      'UnconnectedMortgageInput : handleSetMortgage : values =>',
      values,
    );
    const {getCumulativeInterest} = this.props;
    const payload = {
      [PAYLOAD_KEYS.MORTGAGE_INPUT
        .MORTGAGE_BALANCE]: values.mortgageAmount.replace(/,/g, ''),
      [PAYLOAD_KEYS.MORTGAGE_INPUT.MORTGAGE_TERM]: values.timePeriod.replace(
        /,/g,
        '',
      ),
      [PAYLOAD_KEYS.MORTGAGE_INPUT
        .MORTGAGE_PAYMENT]: values.monthlyMortgagePayment.replace(/,/g, ''),
    };
    await getCumulativeInterest(payload);
    const {getCumulativeInterestResponse} = this.props;
    //Condition check for negative Interest
    if (_get(getCumulativeInterestResponse, DB_KEYS.ERROR, false))
      this.showServerError();
    else {
      const cumulativeInterest = _get(
        getCumulativeInterestResponse,
        DB_KEYS.TOTAL_INTEREST,
        false,
      );
      if (cumulativeInterest >= 0)
        this.props.navigation.navigate(
          NAVIGATION_SCREEN_NAME.SAVE_INTEREST_SCREEN,
        );
      else {
        showSnackBar(
          {},
          localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.NEGATIVE_INTEREST),
        );
      }
    }
  };
  render() {
    const {
      handleSubmit,
      getCumulativeInterestResponse,
      reducerResponse,
    } = this.props;
    return (
      <View style={styles.screenContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent={true}
          rightIconPresent
          // title={localeString(LOCALE_STRING.MORTGAGE_INPUT_DATA.TITLE)}
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/* <View style={styles.mortgageStatusProgressContainer}>
              <Text style={styles.mortgageTextData}>
                {localeString(
                  LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_MORTGAGE_DATA,
                )}
              </Text>
              <Text style={styles.progressFractionText}>1/4</Text>
            </View> */}
            <Text style={styles.mainHeaderText}>
              {localeString(
                LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_WORKOUT,
              )}
            </Text>
            <Text style={styles.mainSubHeaderText}>
              {localeString(
                LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_TAKE_YOUR_BEST,
              )}
            </Text>
            <View style={styles.mortgageFormComponent}>
              <MortgageInputContainer
                handleCalculateNowPressed={this.handlePayNowVisibility}
                handleSubmitEnd={handleSubmit(this.handleSetMortgage)}
                serverErrorObject={getCumulativeInterestResponse}
                serverErrorVisibility={this.state.serverError}
                showServerError={() => this.showServerError()}
                hideServerError={() => this.hideServerError()}
              />
            </View>
            <Button
              title={localeString(
                LOCALE_STRING.MORTGAGE_INPUT_DATA.BUTTON_LOCALE_STRING,
              )}
              onPress={handleSubmit(this.handleSetMortgage)}
              titleStyle={styles.buttonExteriorStyle}
              buttonStyle={styles.buttonInteriorStyle}
              disabled={this.state.enableButton}
              loading={_get(
                getCumulativeInterestResponse,
                DB_KEYS.IS_FETCHING,
                false,
              )}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
export const MortgageInputForm = reduxForm({
  form: APP_CONSTANTS.MORTGAGE_INPUT_FORM,
  destroyOnUnmount: false,
})(UnconnectedMortgageInput);

const mapStateToProps = state => ({
  getCumulativeInterestResponse: state.getCumulativeInterest,
  reducerResponse: state.form,
});

const bindActions = dispatch => ({
  getCumulativeInterest: payload =>
    dispatch(getCumulativeInterest.fetchCall(payload)),
  reset,
});

export const MortgageInput = connect(
  mapStateToProps,
  bindActions,
)(MortgageInputForm);

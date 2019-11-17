import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, MortgageInputContainer} from '../../components';
import {localeString} from '../../utils/i18n';
import {NAVIGATION_SCREEN_NAME, DB_KEYS} from '../../utils/constants';
import {Button} from 'react-native-elements';
import {getCumulativeInterest} from '../../store/reducers';
import {reduxForm} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {APP_CONSTANTS, LOCALE_STRING} from '../../utils/constants';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
  getCumulativeInterest: (payload: object) => void;
  getCumulativeInterestResponse: () => void;
  handleSubmit: (firstParam: (values: object) => void) => void;
}

interface state {
  enableButton: boolean;
}

export class UnconnectedMortgageInput extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      enableButton: true,
    };
    this.handlePayNowVisibility = this.handlePayNowVisibility.bind(this);
  }
  // Back Icon Pressed
  handleBackPress = () => {};
  // Funtion to toggle the visibility of the submit buttons
  handlePayNowVisibility() {
    this.setState({enableButton: false});
  }
  /**
   *
   * @param values : object : object with all form values
   */
  handlePayNowPress = async (values: object) => {
    console.log(
      'UnconnectedMortgageInput : handlePayNowPress : values =>',
      values,
    );
    const {getCumulativeInterest} = this.props;
    const payload = {
      mortgage_balance: values.mortgageAmount.replace(/,/g, ''),
      mortgage_term: values.timePeriod.replace(/,/g, ''),
      mortgage_payment: values.monthlyMortgagePayment.replace(/,/g, ''),
    };
    await getCumulativeInterest(payload);
    const {getCumulativeInterestResponse} = this.props;
    const cumulativeInterest = _get(
      getCumulativeInterestResponse,
      DB_KEYS.TOTAL_INTEREST,
      false,
    );
    if (cumulativeInterest)
      this.props.navigation.navigate(
        NAVIGATION_SCREEN_NAME.SAVE_INTEREST_SCREEN,
      );
  };
  render() {
    const {handleSubmit, getCumulativeInterestResponse} = this.props;
    return (
      <View style={styles.screenContainer}>
        <Header onBackPress={() => this.handleBackPress()} />
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.mortgageStatusProgressContainer}>
              <Text style={styles.mortgageTextData}>
                {localeString(
                  LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_MORTGAGE_DATA,
                )}
              </Text>
              <Text style={styles.progressFractionText}>1/4</Text>
            </View>
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
              />
            </View>
            <Button
              title={localeString(
                LOCALE_STRING.MORTGAGE_INPUT_DATA.BUTTON_LOCALE_STRING,
              )}
              onPress={handleSubmit(this.handlePayNowPress)}
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
})(UnconnectedMortgageInput);

const mapStateToProps = state => ({
  getCumulativeInterestResponse: state.getCumulativeInterest,
  reducerResponse: state.form,
});

const bindActions = dispatch => ({
  getCumulativeInterest: payload =>
    dispatch(getCumulativeInterest.fetchCall(payload)),
});

export const MortgageInput = connect(
  mapStateToProps,
  bindActions,
)(MortgageInputForm);

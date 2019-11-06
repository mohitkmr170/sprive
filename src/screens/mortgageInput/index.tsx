import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, MortgageInputContainer} from '../../components';
import {localeString} from '../../utils/i18n';
import {NAVIGATION_SCREEN_NAME} from '../../utils/constants';
import {Button} from 'react-native-elements';
import {reduxForm} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {APP_CONSTANTS} from '../../utils/constants';

const LOCALE_STRING_MORTGAGE_DATA = 'mortgageForm.mortgageData';
const LOCALE_STRING_WORKOUT = 'mortgageForm.letUsWorkOut';
const LOCALE_STRING_TAKE_YOUR_BEST = 'mortgageForm.takeYourBest';
const BUTTON_LOCALE_STRING = 'global.calculateNow';
interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
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
  handleBackPress = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
  };
  // Funtion to toggle the visibility of the submit buttons
  handlePayNowVisibility() {
    this.setState({enableButton: false});
  }
  /**
   *
   * @param values : object : object with all form values
   */
  handlePayNowPress = (values: object) => {
    console.log(
      'UnconnectedMortgageInput : handlePayNowPress : values =>',
      values,
    );
  };
  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.screenContainer}>
        <Header onBackPress={() => this.handleBackPress()} />
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.mortgageStatusProgressContainer}>
              <Text style={styles.mortgageTextData}>
                {localeString(LOCALE_STRING_MORTGAGE_DATA)}
              </Text>
              <Text style={styles.progressFractionText}>1/4</Text>
            </View>
            <Text style={styles.mainHeaderText}>
              {localeString(LOCALE_STRING_WORKOUT)}
            </Text>
            <Text style={styles.mainSubHeaderText}>
              {localeString(LOCALE_STRING_TAKE_YOUR_BEST)}
            </Text>
            <View style={styles.mortgageFormComponent}>
              <MortgageInputContainer
                handleCalculateNowPressed={this.handlePayNowVisibility}
              />
            </View>
          </KeyboardAwareScrollView>
          <Button
            title={localeString(BUTTON_LOCALE_STRING)}
            onPress={handleSubmit(this.handlePayNowPress)}
            style={styles.buttonExteriorStyle}
            buttonStyle={styles.buttonInteriorStyle}
            disabled={this.state.enableButton}
          />
        </View>
      </View>
    );
  }
}
export const MortgageInputForm = reduxForm({
  form: APP_CONSTANTS.MORTGAGE_INPUT_FORM,
})(UnconnectedMortgageInput);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
});

const bindActions = () => ({});

export const MortgageInput = connect(
  mapStateToProps,
  bindActions,
)(MortgageInputForm);

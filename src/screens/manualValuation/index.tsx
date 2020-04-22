import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {Header, GeneralStatusBar, ReduxFormField} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {} from '../../assets';
import {
  COLOR,
  localeString,
  APP_CONSTANTS,
  LOCALE_STRING,
  numeric,
  required,
  getNumberWithCommas,
} from '../../utils';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  getUserInfoResponse: object;
}
interface state {}

export class UnconnectedManualValuation extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  handleFormSubmit = (values: object) => {
    console.log('Form value', values);
  };

  formatCurrency = (input: string) => {
    if (!input) return;
    else {
      let inputWithNoCommas = input.replace(/,/g, '');
      let inputWithCommas = getNumberWithCommas(inputWithNoCommas);
      return inputWithCommas;
    }
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            title={localeString(LOCALE_STRING.USER_PROFILE.USER_PROFILE)}
            rightIconPresent
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.centerContainer}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.fieldContainer}>
                <Text style={styles.questionText}>
                  {localeString(LOCALE_STRING.USER_PROFILE.QUESTION)}
                </Text>
                <Text style={styles.valuationGuessText}>
                  {localeString(LOCALE_STRING.USER_PROFILE.GUESS)}
                </Text>
                <Field
                  name="home_valuation"
                  label={localeString(
                    LOCALE_STRING.USER_PROFILE.VALUATION_LABEL,
                  )}
                  currencyIcon
                  parameterText={'in pounds'}
                  editIcon={true}
                  format={this.formatCurrency}
                  fieldLabelStyle={styles.fieldLabelStyle}
                  component={ReduxFormField}
                  props={{
                    keyboardType: 'numeric',
                    style: styles.formInput,
                    autoCapitalize: false,
                    returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.DONE,
                  }}
                  validate={[required, numeric]}
                />
              </View>
            </TouchableWithoutFeedback>
            <Button
              title={localeString(LOCALE_STRING.USER_PROFILE.NEXT)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleFormSubmit)}
              buttonStyle={styles.buttonStyle}
              loading={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

export const ManualValuationForm = reduxForm({
  form: APP_CONSTANTS.MANUAL_VALUATION,
})(UnconnectedManualValuation);

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({});

export const ManualValuation = connect(
  mapStateToProps,
  bindActions,
)(ManualValuationForm);

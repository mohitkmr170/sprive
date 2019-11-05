import React from 'react';
import {View, Text, TouchableOpacity, Alert, Button} from 'react-native';
import {styles} from './styles';
import {ReduxFormField} from '../ReduxFormField';
import {Field, reduxForm} from 'redux-form';
import {APP_CONSTANTS} from '../../utils/constants';
import {connect} from 'react-redux';
import {
  required,
  numeric,
  maxLength8,
  maxLength6,
  yearRange,
} from '../../utils/validate';
import {get} from 'lodash';
import {localeString} from '../../utils/i18n';
import {COLOR} from '../../utils/colors';

// Screen constants for all three fields
const FIELD_DATA = [
  {
    NAME: 'mortgageAmount',
    LOCALE_STRING: 'mortgageForm.morgageAmountLabel',
    KEYBOARD_TYPE: 'number-pad',
    RETURN_KEY: 'done',
    ERROR_STATUS: 'MortgageInput.syncErrors.mortgageAmount',
    PLACEHOLDER: 'Mortgage data',
    PARAMETER_TEXT: 'in pounds',
    INFO_TEXT: 'The approximate amount left to pay on your mortgage.',
  },
  {
    NAME: 'timePeriod',
    LOCALE_STRING: 'mortgageForm.timePeriodLabel',
    KEYBOARD_TYPE: 'number-pad',
    RETURN_KEY: 'done',
    ERROR_STATUS: 'MortgageInput.syncErrors.timePeriod',
    PLACEHOLDER: '10',
    PARAMETER_TEXT: 'in years',
    INFO_TEXT: 'Info for second input',
  },
  {
    NAME: 'monthlyMortgagePayment',
    LOCALE_STRING: 'mortgageForm.monthlyMortgagePaymentLabel',
    KEYBOARD_TYPE: 'number-pad',
    RETURN_KEY: 'done',
    ERROR_STATUS: 'MortgageInput.syncErrors.monthlyMortgagePayment',
    PLACEHOLDER: '120400',
    PARAMETER_TEXT: 'in punds',
    INFO_TEXT: 'Info for third input',
  },
];

interface props {
  reducerResponse: object;
  handleCalculateNowPressed: () => void;
}
interface state {}

class UnconnectedMortgageInputContainer extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  render() {
    // calculating error status for enable/disable
    let firstFieldErrorStatus = get(
      this.props.reducerResponse,
      FIELD_DATA[0].ERROR_STATUS,
      false,
    );
    let secondFieldErrorStatus = get(
      this.props.reducerResponse,
      FIELD_DATA[1].ERROR_STATUS,
      false,
    );
    let thirdFieldErrorStatus = get(
      this.props.reducerResponse,
      FIELD_DATA[2].ERROR_STATUS,
      false,
    );
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Field
            name={FIELD_DATA[0].NAME}
            label={localeString(FIELD_DATA[0].LOCALE_STRING)}
            currencyIcon
            component={ReduxFormField}
            props={{
              keyboardType: FIELD_DATA[0].KEYBOARD_TYPE,
              style: styles.mortgageInputInput,
              returnKeyType: FIELD_DATA[0].RETURN_KEY,
              placeholder: FIELD_DATA[0].PLACEHOLDER,
              placeholderTextColor: COLOR.VOILET,
              editable: true,
            }}
            parameterText={FIELD_DATA[0].PARAMETER_TEXT}
            editIcon={true}
            /*
            Validation rules: Positive Integers, required, and maximum value of 10 millions accepted
            */
            validate={[required, numeric, maxLength8]}
          />
          {/* Input field Info and Error messages to be decided and added */}
          <Text style={styles.infoText}>{FIELD_DATA[0].INFO_TEXT}</Text>
          <Field
            name={FIELD_DATA[1].NAME}
            label={localeString(FIELD_DATA[1].LOCALE_STRING)}
            component={ReduxFormField}
            props={{
              keyboardType: FIELD_DATA[1].KEYBOARD_TYPE,
              style: [styles.mortgageInputInput],
              returnKeyType: FIELD_DATA[1].RETURN_KEY,
              placeholder: FIELD_DATA[1].PLACEHOLDER,
              placeholderTextColor: !firstFieldErrorStatus
                ? COLOR.VOILET
                : COLOR.DISABLED_COLOR,
              editable: !firstFieldErrorStatus,
            }}
            editIcon={true}
            parameterText={FIELD_DATA[0].PARAMETER_TEXT}
            /*
            Validation rules: Positive Integers, required, and year range should vary between [0-35]
            */
            validate={[required, numeric, yearRange]}
          />
          {/* Input field Info and Error messages to be decided and added */}
          {!firstFieldErrorStatus && (
            <Text style={styles.infoText}>{FIELD_DATA[1].INFO_TEXT}</Text>
          )}
          <Field
            name={FIELD_DATA[2].NAME}
            label={localeString(FIELD_DATA[2].LOCALE_STRING)}
            currencyIcon
            component={ReduxFormField}
            props={{
              keyboardType: FIELD_DATA[2].KEYBOARD_TYPE,
              style: [styles.mortgageInputInput],
              returnKeyType: FIELD_DATA[2].RETURN_KEY,
              placeholder: FIELD_DATA[2].PLACEHOLDER,
              editable: !firstFieldErrorStatus && !secondFieldErrorStatus,
              placeholderTextColor:
                !firstFieldErrorStatus && !secondFieldErrorStatus
                  ? COLOR.VOILET
                  : COLOR.DISABLED_COLOR,
              onChangeText:
                !thirdFieldErrorStatus && this.props.handleCalculateNowPressed,
            }}
            editIcon={true}
            parameterText={FIELD_DATA[0].PARAMETER_TEXT}
            /*
            Validation rules: Positive Integers, required, and maximum value of 100000 accepted
            */
            validate={[required, numeric, maxLength6]}
          />
          {/* Input field Info and Error messages to be decided and added */}
          {!firstFieldErrorStatus && !secondFieldErrorStatus && (
            <Text style={styles.infoText}>{FIELD_DATA[2].INFO_TEXT}</Text>
          )}
        </View>
      </View>
    );
  }
}
export const MortgageInputContainerForm = reduxForm({
  form: APP_CONSTANTS.MORTGAGE_INPUT_FORM,
})(UnconnectedMortgageInputContainer);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
});

const bindActions = () => ({});

export const MortgageInputContainer = connect(
  mapStateToProps,
  bindActions,
)(MortgageInputContainerForm);

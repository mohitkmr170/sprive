import React from 'react';
import {View, Text} from 'react-native';
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
import {get as _get} from 'lodash';
import {localeString} from '../../utils/i18n';
import {COLOR} from '../../utils/colors';

const FORM_FIELD_KEY: object = {
  MORTGAGE_AMOUNT: 'mortgageAmount',
  TIME_PERIOD: 'timePeriod',
  MONTHLY_MORTGAGE_PAYMENT: 'monthlyMortgagePayment',
};
const KEYBOARD_TYPE = 'number-pad';
const RETURN_KEY = 'done';
const COMMON_VALIDATION_RULE = [required, numeric];
// Screen constants for all three fields
const FIELD_DATA = new Array();
FIELD_DATA[FORM_FIELD_KEY.MORTGAGE_AMOUNT] = {
  NAME: 'mortgageAmount',
  LOCALE_STRING: 'mortgageForm.morgageAmountLabel',
  ERROR_STATUS: 'MortgageInput.syncErrors.mortgageAmount',
  PLACEHOLDER: 'Mortgage data',
  PARAMETER_TEXT: 'in pounds',
  INFO_TEXT: 'The approximate amount left to pay on your mortgage.',
  CURRENCY_ICON: true,
  VALIDATION_RULE:
    COMMON_VALIDATION_RULE && COMMON_VALIDATION_RULE.concat(maxLength8),
};
FIELD_DATA[FORM_FIELD_KEY.TIME_PERIOD] = {
  NAME: 'timePeriod',
  LOCALE_STRING: 'mortgageForm.timePeriodLabel',
  ERROR_STATUS: 'MortgageInput.syncErrors.timePeriod',
  PLACEHOLDER: '10',
  PARAMETER_TEXT: 'in years',
  INFO_TEXT: 'Info for second input',
  CURRENCY_ICON: false,
  VALIDATION_RULE:
    COMMON_VALIDATION_RULE && COMMON_VALIDATION_RULE.concat(yearRange),
};
FIELD_DATA[FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT] = {
  NAME: 'monthlyMortgagePayment',
  LOCALE_STRING: 'mortgageForm.monthlyMortgagePaymentLabel',
  ERROR_STATUS: 'MortgageInput.syncErrors.monthlyMortgagePayment',
  PLACEHOLDER: '120400',
  PARAMETER_TEXT: 'in pounds',
  INFO_TEXT: 'Info for third input',
  CURRENCY_ICON: true,
  VALIDATION_RULE:
    COMMON_VALIDATION_RULE && COMMON_VALIDATION_RULE.concat(maxLength6),
};

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

  renderFieldItem = (item: object) => {
    // calculating error status for enable/disable
    let firstFieldErrorStatus = _get(
      this.props.reducerResponse,
      FIELD_DATA[FORM_FIELD_KEY.MORTGAGE_AMOUNT].ERROR_STATUS,
      false,
    );
    let secondFieldErrorStatus = _get(
      this.props.reducerResponse,
      FIELD_DATA[FORM_FIELD_KEY.TIME_PERIOD].ERROR_STATUS,
      false,
    );
    let thirdFieldErrorStatus = _get(
      this.props.reducerResponse,
      FIELD_DATA[FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT].ERROR_STATUS,
      false,
    );

    // Added key dynamicValue having all values that change dynamically based on ERROR_STATUS
    FIELD_DATA[FORM_FIELD_KEY.MORTGAGE_AMOUNT].dynamicValue = {
      editable: true,
      placeholderTextColor: COLOR.VOILET,
      infoVisibility: true,
    };
    FIELD_DATA[FORM_FIELD_KEY.TIME_PERIOD].dynamicValue = {
      editable: !firstFieldErrorStatus,
      placeholderTextColor: !firstFieldErrorStatus
        ? COLOR.VOILET
        : COLOR.DISABLED_COLOR,
      infoVisibility: !firstFieldErrorStatus,
    };
    FIELD_DATA[FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT].dynamicValue = {
      editable: !firstFieldErrorStatus && !secondFieldErrorStatus,
      placeholderTextColor:
        !firstFieldErrorStatus && !secondFieldErrorStatus
          ? COLOR.VOILET
          : COLOR.DISABLED_COLOR,
      infoVisibility: !firstFieldErrorStatus && !secondFieldErrorStatus,
    };
    return (
      <View>
        <Field
          name={item.NAME}
          label={localeString(item.LOCALE_STRING)}
          currencyIcon={item.CURRENCY_ICON}
          component={ReduxFormField}
          props={{
            keyboardType: KEYBOARD_TYPE,
            style: styles.mortgageInputInput,
            returnKeyType: RETURN_KEY,
            placeholder: item.PLACEHOLDER,
            placeholderTextColor: item.dynamicValue.placeholderTextColor,
            editable: item.dynamicValue.editable,
            onChangeText:
              !thirdFieldErrorStatus &&
              item.NAME === FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT &&
              this.props.handleCalculateNowPressed,
          }}
          parameterText={item.PARAMETER_TEXT}
          editIcon={true}
          validate={item.VALIDATION_RULE}
        />
        {/* Input field Info and Error messages to be decided and added */}
        {item.dynamicValue.infoVisibility && (
          <Text style={styles.infoText}>{item.INFO_TEXT}</Text>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          {Object.keys(FIELD_DATA).map((key: string) =>
            this.renderFieldItem(FIELD_DATA[key]),
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

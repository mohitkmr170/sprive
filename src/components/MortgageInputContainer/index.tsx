import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {ReduxFormField} from '../ReduxFormField';
import {Field, reduxForm} from 'redux-form';
import {APP_CONSTANTS, DB_KEYS, LOCALE_STRING} from '../../utils/constants';
import {connect} from 'react-redux';
import {
  required,
  numeric,
  maxLimitMortgage,
  maxLimitMonthlyMortgage,
  yearRange,
} from '../../utils/validate';
import {get as _get} from 'lodash';
import {localeString} from '../../utils/i18n';
import {getNumberWithCommas} from '../../utils/helperFunctions';

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
  PLACEHOLDER: '250,000',
  PARAMETER_TEXT: 'in pounds',
  INFO_TEXT: 'The approximate amount left to pay on your mortgage.',
  CURRENCY_ICON: true,
  VALIDATION_RULE:
    COMMON_VALIDATION_RULE && COMMON_VALIDATION_RULE.concat(maxLimitMortgage),
};
FIELD_DATA[FORM_FIELD_KEY.TIME_PERIOD] = {
  NAME: 'timePeriod',
  LOCALE_STRING: 'mortgageForm.timePeriodLabel',
  ERROR_STATUS: 'MortgageInput.syncErrors.timePeriod',
  PLACEHOLDER: '25',
  PARAMETER_TEXT: 'in years',
  INFO_TEXT:
    'The approximate length of time you have left to pay on your mortgage.',
  CURRENCY_ICON: false,
  VALIDATION_RULE:
    COMMON_VALIDATION_RULE && COMMON_VALIDATION_RULE.concat(yearRange),
};
FIELD_DATA[FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT] = {
  NAME: 'monthlyMortgagePayment',
  LOCALE_STRING: 'mortgageForm.monthlyMortgagePaymentLabel',
  ERROR_STATUS: 'MortgageInput.syncErrors.monthlyMortgagePayment',
  PLACEHOLDER: '1,204',
  PARAMETER_TEXT: 'in pounds',
  INFO_TEXT: 'The amount you are required to pay your lender each month.',
  CURRENCY_ICON: true,
  VALIDATION_RULE:
    COMMON_VALIDATION_RULE &&
    COMMON_VALIDATION_RULE.concat(maxLimitMonthlyMortgage),
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

  /**
   * @param value : string : Validation WRT mortgageAmount & mortgageTer
   */
  negativeValidation = (value: string) => {
    const {reducerResponse} = this.props;
    const monthlyMortgage = Number(
      _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT, '').replace(
        /,/g,
        '',
      ),
    );
    const timePeriod = Number(
      _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_TIMEPERIOD, '').replace(
        /,/g,
        '',
      ),
    );
    const withoutCommas = value.replace(/,/g, '');
    const thresholdMonthlyLimit = monthlyMortgage / (timePeriod * 12);
    return value && thresholdMonthlyLimit > Number(withoutCommas)
      ? localeString(LOCALE_STRING.MORTGAGE_INPUT_DATA.INVALID_AMOUNT)
      : undefined;
  };

  formatCurrency = (input: string) => {
    if (!input) return;
    else {
      let inputWithNoCommas = input.replace(/,/g, '');
      let inputWithCommas = getNumberWithCommas(inputWithNoCommas);
      return inputWithCommas;
    }
  };

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
      infoVisibility: true,
    };
    FIELD_DATA[FORM_FIELD_KEY.TIME_PERIOD].dynamicValue = {
      editable: !firstFieldErrorStatus,
      infoVisibility: !firstFieldErrorStatus,
    };
    FIELD_DATA[FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT].dynamicValue = {
      editable: !firstFieldErrorStatus && !secondFieldErrorStatus,
      infoVisibility: !firstFieldErrorStatus && !secondFieldErrorStatus,
    };
    item.NAME === FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT &&
      item.VALIDATION_RULE.push(this.negativeValidation);
    return (
      <View style={{opacity: item.dynamicValue.editable ? 1 : 0.4}}>
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
            editable: item.dynamicValue.editable,
            onChangeText:
              item.NAME === FORM_FIELD_KEY.MONTHLY_MORTGAGE_PAYMENT &&
              this.props.handleCalculateNowPressed,
          }}
          format={this.formatCurrency}
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

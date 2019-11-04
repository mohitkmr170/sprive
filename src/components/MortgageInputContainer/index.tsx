import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {ReduxFormField} from '../ReduxFormField';
import {Field, reduxForm} from 'redux-form';
import {APP_CONSTANTS} from '../../utils/constants';
import {connect} from 'react-redux';
import {required} from '../../utils/validate';
import {get} from 'lodash';
import {localeString} from '../../utils/i18n';

// Screen constants for all three fields
const FIELD_DATA = [
  {
    NAME: 'mortgageAmount',
    LOCALE_STRING: 'mortgageForm.morgageAmountLabel',
    KEYBOARD_TYPE: 'number-pad',
    RETURN_KEY: 'done',
    ERROR_STATUS: 'MortgageInput.syncErrors.mortgageAmount',
    PLACEHOLDER: 'Mortgage Amount',
  },
  {
    NAME: 'timePeriod',
    LOCALE_STRING: 'mortgageForm.timePeriodLabel',
    KEYBOARD_TYPE: 'number-pad',
    RETURN_KEY: 'done',
    ERROR_STATUS: 'MortgageInput.syncErrors.timePeriod',
    PLACEHOLDER: 'Time Period',
  },
  {
    NAME: 'monthlyMortgagePayment',
    LOCALE_STRING: 'mortgageForm.monthlyMortgagePaymentLabel',
    KEYBOARD_TYPE: 'number-pad',
    RETURN_KEY: 'done',
    ERROR_STATUS: 'MortgageInput.syncErrors.monthlyMortgagePayment',
    PLACEHOLDER: 'Monthly Mortgage Payment',
  },
];

const BUTTON_LOCALE_STRING = 'global.calculateNow';

interface props {
  handleSubmit: (firstParam: (values: object) => void) => void;
  reducerResponse: object;
}
interface state {}

class UnconnectedMortgageInputContainer extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  /**
   *
   * @param values : object : object with all form values
   */
  handleCalculateNowPress(values: object) {
    console.log(
      'UnconnectedMortgageInputContainer : handleCalculateNowPress : values =>',
      values,
    );
  }

  render() {
    const {handleSubmit} = this.props;

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
              editable: true,
            }}
            editIcon={true}
            validate={[required]}
          />
          {/* Input field Info and Error messages to be decided and added */}
          <Text>Info for first input</Text>
          <Field
            name={FIELD_DATA[1].NAME}
            label={localeString(FIELD_DATA[1].LOCALE_STRING)}
            component={ReduxFormField}
            props={{
              keyboardType: FIELD_DATA[1].KEYBOARD_TYPE,
              style: styles.mortgageInputInput,
              returnKeyType: FIELD_DATA[1].RETURN_KEY,
              placeholder: FIELD_DATA[1].PLACEHOLDER,
              editable: !firstFieldErrorStatus,
            }}
            editIcon={true}
            validate={[required]}
          />
          {/* Input field Info and Error messages to be decided and added */}
          <Text>Info for second input</Text>
          <Field
            name={FIELD_DATA[2].NAME}
            label={localeString(FIELD_DATA[2].LOCALE_STRING)}
            currencyIcon
            component={ReduxFormField}
            props={{
              keyboardType: FIELD_DATA[2].KEYBOARD_TYPE,
              style: styles.mortgageInputInput,
              returnKeyType: FIELD_DATA[2].RETURN_KEY,
              placeholder: FIELD_DATA[2].PLACEHOLDER,
              editable: !firstFieldErrorStatus && !secondFieldErrorStatus,
            }}
            editIcon={true}
            validate={[required]}
          />
          {/* Input field Info and Error messages to be decided and added */}
          <Text>Info for third input</Text>
        </View>
        <Button
          title={localeString(BUTTON_LOCALE_STRING)}
          onPress={handleSubmit(this.handleCalculateNowPress)}
          style={{marginBottom: 12, marginHorizontal: 24}}
          buttonStyle={{borderRadius: 24, backgroundColor: '#DD2371'}}
          disabled={
            !(
              !firstFieldErrorStatus &&
              !secondFieldErrorStatus &&
              !thirdFieldErrorStatus
            )
          }
        />
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

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
} from 'react-native';
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
    CURRENCY_ICON: true,
    VALIDATION_RULE: [required, numeric, maxLength8],
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
    CURRENCY_ICON: false,
    VALIDATION_RULE: [required, numeric, yearRange],
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
    CURRENCY_ICON: true,
    VALIDATION_RULE: [required, numeric, maxLength6],
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

  renderFieldItem = (item: object, index: number) => {
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
    let tempArray = [
      {
        editable: true,
        placeholderTextColor: COLOR.VOILET,
        infoVisibility: true,
      },
      {
        editable: !firstFieldErrorStatus,
        placeholderTextColor: !firstFieldErrorStatus
          ? COLOR.VOILET
          : COLOR.DISABLED_COLOR,
        infoVisibility: !firstFieldErrorStatus,
      },
      {
        editable: !firstFieldErrorStatus && !secondFieldErrorStatus,
        placeholderTextColor:
          !firstFieldErrorStatus && !secondFieldErrorStatus
            ? COLOR.VOILET
            : COLOR.DISABLED_COLOR,
        infoVisibility: !firstFieldErrorStatus && !secondFieldErrorStatus,
      },
    ];
    return (
      <View>
        <Field
          name={FIELD_DATA[index].NAME}
          label={localeString(FIELD_DATA[index].LOCALE_STRING)}
          currencyIcon={FIELD_DATA[index].CURRENCY_ICON}
          component={ReduxFormField}
          props={{
            keyboardType: FIELD_DATA[index].KEYBOARD_TYPE,
            style: styles.mortgageInputInput,
            returnKeyType: FIELD_DATA[index].RETURN_KEY,
            placeholder: FIELD_DATA[index].PLACEHOLDER,
            placeholderTextColor: tempArray[index].placeholderTextColor,
            editable: tempArray[index].editable,
            onChangeText:
              !thirdFieldErrorStatus &&
              index === 2 &&
              this.props.handleCalculateNowPressed,
          }}
          parameterText={FIELD_DATA[index].PARAMETER_TEXT}
          editIcon={true}
          validate={FIELD_DATA[index].VALIDATION_RULE}
        />
        {/* Input field Info and Error messages to be decided and added */}
        {tempArray[index].infoVisibility && (
          <Text style={styles.infoText}>{FIELD_DATA[index].INFO_TEXT}</Text>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <FlatList
            data={FIELD_DATA}
            extraData={this.props}
            keyExtractor={index => index.toString()}
            renderItem={({item, index}) => this.renderFieldItem(item, index)}
          />
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

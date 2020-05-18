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
import {
  taskHandler,
  getUserInfo,
  updateUserAddress,
} from '../../store/reducers';
import {connect} from 'react-redux';
import {} from '../../assets';
import {
  COLOR,
  STATE_PARAMS,
  localeString,
  APP_CONSTANTS,
  LOCALE_STRING,
  numeric,
  required,
  getNumberWithCommas,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  maxLimitMortgage,
  FE_FORM_VALUE_CONSTANTS,
  PAYLOAD_KEYS,
  PENDING_TASK_IDS,
} from '../../utils';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  reducerResponse: object;
  taskHandler: (payload: object) => void;
  taskHandlerResponse: object;
  getUserInfo: () => void;
  getUserInfoResponse: object;
  updateUserAddress: (payload: object, qParams: object) => void;
  updateUserAddressResponse: object;
}
interface state {}

export class UnconnectedManualValuation extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  getAddressPayload = (
    formValues: object,
    isEdit: boolean,
    currentValues: object,
  ) => {
    const {getUserInfoResponse} = this.props;
    if (isEdit) {
      const updatePayload = {
        [PAYLOAD_KEYS.USER_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.DATA_ID,
          null,
        ),
        [PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_1]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE1,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_2]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE2,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.CITY]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.COUNTY]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.COUNTY,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.POST_CODE]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE,
          '',
        ),
        home_valuation: _get(
          currentValues,
          FE_FORM_VALUE_CONSTANTS.HOME_VALUATION,
          0,
        ).replace(/,/g, ''),
      };
      if (!updatePayload[PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_2])
        delete updatePayload[PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_2];
      if (!updatePayload[PAYLOAD_KEYS.PENDING_TASK.COUNTY])
        delete updatePayload[PAYLOAD_KEYS.PENDING_TASK.COUNTY];
      return updatePayload;
    } else {
      const payload = {
        [PAYLOAD_KEYS.PENDING_TASK.USER_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.DATA_ID,
          null,
        ),
        [PAYLOAD_KEYS.PENDING_TASK.TASK_ID]:
          PENDING_TASK_IDS.TASKS.USER_PROFILE,
        [PAYLOAD_KEYS.PENDING_TASK.STAGE_ID]: PENDING_TASK_IDS.STAGES.ADDRESS,
        [PAYLOAD_KEYS.PENDING_TASK.DATA]: {
          [PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_1]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE1,
            '',
          ),
          [PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_2]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE2,
            '',
          ),
          [PAYLOAD_KEYS.PENDING_TASK.CITY]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY,
            '',
          ),
          [PAYLOAD_KEYS.PENDING_TASK.COUNTY]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.COUNTY,
            '',
          ),
          [PAYLOAD_KEYS.PENDING_TASK.POST_CODE]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE,
            '',
          ),
          home_valuation: _get(
            currentValues,
            FE_FORM_VALUE_CONSTANTS.HOME_VALUATION,
            0,
          ).replace(/,/g, ''),
        },
      };
      if (
        !payload[PAYLOAD_KEYS.PENDING_TASK.DATA][
          PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_2
        ]
      )
        delete payload[PAYLOAD_KEYS.PENDING_TASK.DATA][
          PAYLOAD_KEYS.PENDING_TASK.ADD_LINE_2
        ];
      if (
        !payload[PAYLOAD_KEYS.PENDING_TASK.DATA][
          PAYLOAD_KEYS.PENDING_TASK.COUNTY
        ]
      )
        delete payload[PAYLOAD_KEYS.PENDING_TASK.DATA][
          PAYLOAD_KEYS.PENDING_TASK.COUNTY
        ];
      return payload;
    }
  };

  handleStageSubmission = async (formValues: object, values: object) => {
    const {
      taskHandler,
      getUserInfo,
      getUserInfoResponse,
      updateUserAddress,
    } = this.props;
    await this.props.getUserInfo();
    if (
      Object.keys(_get(getUserInfoResponse, DB_KEYS.ADDRESS_RESPONSE, {}))
        .length
    ) {
      const payload = this.getAddressPayload(formValues, true, values);
      if (payload) {
        await updateUserAddress(payload, {
          [PAYLOAD_KEYS.ID]: _get(
            getUserInfoResponse,
            DB_KEYS.USER_ADDRESS_ID,
            null,
          ),
        });
      }
    } else {
      const payload = this.getAddressPayload(formValues, false, values);
      if (payload) {
        await taskHandler(payload);
      }
    }
    const {taskHandlerResponse, updateUserAddressResponse} = this.props;
    if (
      !(
        _get(taskHandlerResponse, DB_KEYS.ERROR, false) ||
        _get(updateUserAddressResponse, DB_KEYS.ERROR, false)
      )
    ) {
      await getUserInfo();
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.HOME_OWNERSHIP, {
        lastRouteName: NAVIGATION_SCREEN_NAME.MANUAL_VALUATION_SCREEN,
      });
    }
  };

  handleFormSubmit = async (values: object) => {
    const {reducerResponse} = this.props;
    const addressValues = _get(
      reducerResponse,
      FE_FORM_VALUE_CONSTANTS.ADDRESS_VALUES,
      null,
    );
    this.handleStageSubmission(addressValues, values);
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
    const {
      handleSubmit,
      taskHandlerResponse,
      updateUserAddressResponse,
    } = this.props;
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
                  validate={[required, numeric, maxLimitMortgage]}
                />
              </View>
            </TouchableWithoutFeedback>
            <Button
              title={localeString(LOCALE_STRING.USER_PROFILE.NEXT)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleFormSubmit)}
              buttonStyle={styles.buttonStyle}
              loading={
                _get(taskHandlerResponse, DB_KEYS.IS_FETCHING, false) ||
                _get(updateUserAddressResponse, DB_KEYS.IS_FETCHING, false)
              }
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
  reducerResponse: state.form,
  getUserInfoResponse: state.getUserInfo,
  taskHandlerResponse: state.taskHandler,
  updateUserAddressResponse: state.updateUserAddress,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  taskHandler: (payload, extraPayload) =>
    dispatch(taskHandler.fetchCall(payload, extraPayload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  updateUserAddress: (payload, extraPayload) =>
    dispatch(updateUserAddress.fetchCall(payload, extraPayload)),
});

export const ManualValuation = connect(
  mapStateToProps,
  bindActions,
)(ManualValuationForm);

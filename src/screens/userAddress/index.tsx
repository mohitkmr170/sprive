import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/Feather';
import {getAddress, taskHandler} from '../../store/reducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {chatIcon} from '../../assets';
import {
  alphaNumeric,
  localeString,
  showSnackBar,
  required,
  APP_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  COLOR,
  DB_KEYS,
  STYLE_CONSTANTS,
  mapFormValues,
  STATE_PARAMS,
  FE_FORM_VALUE_CONSTANTS,
  LOCAL_KEYS,
  APP_REGEX,
  PENDING_TASK_IDS,
  PAYLOAD_KEYS,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  reducerResponse: object;
  getAddress: (payload: object) => void;
  getAddressResponse: object;
  taskHandler: (payload: object) => void;
  taskHandlerResponse: object;
  getUserInfoResponse: object;
}
interface state {
  postCode: string;
}

export class UnConnectedUserAddress extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      postCode: '',
    };
  }
  componentDidMount = () => {};
  handleStageSubmission = async (
    formValues: object,
    selectedAddressIndex: number,
  ) => {
    const {taskHandler, getUserInfoResponse} = this.props;
    const payload = {
      [PAYLOAD_KEYS.PENDING_TASK.USER_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.DATA_ID,
        null,
      ),
      [PAYLOAD_KEYS.PENDING_TASK.TASK_ID]: PENDING_TASK_IDS.TASKS.USER_PROFILE,
      [PAYLOAD_KEYS.PENDING_TASK.STAGE_ID]: PENDING_TASK_IDS.STAGES.ADDRESS,
      [PAYLOAD_KEYS.PENDING_TASK.DATA]: {
        [PAYLOAD_KEYS.PENDING_TASK.HOUSE_NUMBER]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.FLAT_NUMBER,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.STREET_NAME]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.STREET_NAME,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.CITY]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.POST_CODE]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE,
          '',
        ),
      },
    };
    await taskHandler(payload);
    const {taskHandlerResponse} = this.props;
    console.log('TASK SUBMISSION : TASK-1 : STAGE-2 :', taskHandlerResponse);
    if (!_get(taskHandlerResponse, DB_KEYS.ERROR, false))
      this.props.navigation.navigate(
        NAVIGATION_SCREEN_NAME.USER_PROFILE_VIEW_MODE,
        {selectedAddressIndex: selectedAddressIndex},
      );
  };
  handleFormSubmit = (values: object) => {
    const {reducerResponse} = this.props;
    const selectedAddressIndex = _get(
      this.props.navigation,
      STATE_PARAMS.SELECTED_SEARCH_ADDRESS_INDEX,
      null,
    );
    const selectedAddress =
      _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_ADDRESS_FORM}.values.flatNumber`,
        null,
      ) +
      ', ' +
      _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_ADDRESS_FORM}.values.streetName`,
        null,
      ) +
      ', ' +
      _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_ADDRESS_FORM}.values.city`,
        null,
      ) +
      ', ' +
      _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_ADDRESS_FORM}.values.postCode`,
        null,
      );
    if (values) {
      mapFormValues(
        APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE,
        FE_FORM_VALUE_CONSTANTS.USER_PROFILE.FIRST_NAME,
        _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.FIRST_NAME, null),
      );
      mapFormValues(
        APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE,
        FE_FORM_VALUE_CONSTANTS.USER_PROFILE.LAST_NAME,
        _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.LAST_NAME, null),
      );
      mapFormValues(
        APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE,
        FE_FORM_VALUE_CONSTANTS.USER_PROFILE.DATE_OF_BIRTH,
        _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.DOB, null),
      );
      mapFormValues(
        APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE,
        FE_FORM_VALUE_CONSTANTS.USER_PROFILE.ADDRESS,
        selectedAddress,
      );
      this.handleStageSubmission(values, selectedAddressIndex);
    }
  };
  handleCompleteLater = () => {
    this.props.navigation.goBack();
  };
  handleAddressSearch = async () => {
    const {getAddress} = this.props;
    const {postCode} = this.state;
    if (postCode) {
      if (APP_REGEX.POST_CODE_UK.test(postCode)) {
        //As per postCode rules in UK
        //API call to search address based on Post Code
        const payload = {
          post_code: postCode,
        };
        await getAddress(payload);
        const {getAddressResponse} = this.props;
        if (!_get(getAddressResponse, DB_KEYS.ERROR, false))
          this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SEARCH_ADDRESS);
      } else
        showSnackBar(
          {},
          localeString(LOCALE_STRING.USER_PROFILE.POST_CODE_NOT_VALID),
        );
    } else
      showSnackBar(
        {},
        localeString(LOCALE_STRING.USER_PROFILE.POST_CODE_REQUIRED),
      );
  };
  handlePostCodeEntry = (postCode: string) => {
    this.setState({postCode});
  };
  render() {
    const {handleSubmit, getAddressResponse, taskHandlerResponse} = this.props;
    const isFormValuesFilled =
      _get(
        this.props.reducerResponse,
        DB_KEYS.USER_ADDRESS.FLAT_NUMBER,
        null,
      ) &&
      _get(
        this.props.reducerResponse,
        DB_KEYS.USER_ADDRESS.STREET_NAME,
        null,
      ) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_ADDRESS.CITY, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_ADDRESS.POST_CODE, null);
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.USER_PROFILE.USER_PROFILE)}
          rightIconPresent
          iconName={chatIcon}
          iconPath={NAVIGATION_SCREEN_NAME.REPORT_ISSUE}
          navigation={this.props.navigation}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.mainView}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.fieldContainer}>
            <Text style={styles.aboutYouText}>
              {localeString(LOCALE_STRING.USER_PROFILE.ABOUT_YOU)}
            </Text>
            <Text style={styles.enterResidentialAddress}>
              {localeString(
                LOCALE_STRING.USER_PROFILE.ENTER_RESIDENTIAL_ADDRESS,
              )}
            </Text>
            <Input
              leftIcon={
                <Icon
                  name="search"
                  size={STYLE_CONSTANTS.padding.NORMAL}
                  color={COLOR.VOILET}
                />
              }
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={7}
              containerStyle={styles.inputContainerWrapper}
              inputContainerStyle={styles.inputContainer}
              leftIconContainerStyle={styles.leftIconContainer}
              inputStyle={styles.textInput}
              placeholder={localeString(
                LOCALE_STRING.USER_PROFILE.SEARCH_POST_CODE,
              )}
              onChangeText={postCode => this.handlePostCodeEntry(postCode)}
            />
            <TouchableOpacity
              hitSlop={APP_CONSTANTS.HIT_SLOP}
              onPress={() => this.handleAddressSearch()}
              style={styles.findAddressContainer}>
              {_get(getAddressResponse, DB_KEYS.IS_FETCHING, false) ? (
                <ActivityIndicator style={styles.searchLoader} />
              ) : (
                <Text style={styles.findMyAddressText}>
                  {localeString(LOCALE_STRING.USER_PROFILE.FIND_ADDRESS)}
                </Text>
              )}
            </TouchableOpacity>
            <Text style={styles.enterManuallyText}>
              {localeString(LOCALE_STRING.USER_PROFILE.ENTER_MANUALLY)}
            </Text>
            <Field
              name="flatNumber"
              label={localeString(LOCALE_STRING.USER_PROFILE.FLAT_NUMBER)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="streetName"
              label={localeString(LOCALE_STRING.USER_PROFILE.STREET_NAME)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="city"
              label={localeString(LOCALE_STRING.USER_PROFILE.CITY)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="postCode"
              label={localeString(LOCALE_STRING.USER_PROFILE.POST_CODE)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                maxLength: 7,
                autoCapitalize: 'characters',
                autoCorrect: false,
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
          </KeyboardAwareScrollView>
          <Button
            title={localeString(LOCALE_STRING.USER_PROFILE.NEXT)}
            titleStyle={styles.buttonTextStyle}
            onPress={handleSubmit(this.handleFormSubmit)}
            buttonStyle={styles.buttonStyle}
            disabled={!isFormValuesFilled}
            loading={_get(taskHandlerResponse, DB_KEYS.IS_FETCHING, false)}
          />
          <TouchableOpacity
            style={styles.completeLaterContainer}
            hitSlop={APP_CONSTANTS.HIT_SLOP}
            onPress={() => this.handleCompleteLater()}>
            <Text style={styles.completeLaterText}>
              {localeString(LOCALE_STRING.USER_PROFILE.COMPLETE_LATER)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export const UserAddressForm = reduxForm({
  form: APP_CONSTANTS.USER_ADDRESS_FORM,
})(UnConnectedUserAddress);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
  getAddressResponse: state.getAddress,
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({
  getAddress: payload => dispatch(getAddress.fetchCall(payload)),
  taskHandler: (payload, extraPayload) =>
    dispatch(taskHandler.fetchCall(payload, extraPayload)),
});

export const UserAddress = connect(
  mapStateToProps,
  bindActions,
)(UserAddressForm);

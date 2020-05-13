import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {reset as resetNavigation} from '../../navigation/navigationService';
import Icon from 'react-native-vector-icons/Feather';
import {
  getAddress,
  taskHandler,
  getUserInfo,
  updateUserAddress,
} from '../../store/reducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Header,
  ReduxFormField,
  GeneralStatusBar,
  LoadingModal,
} from '../../components';
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
  getUserInfo: () => void;
  updateUserAddress: (payload: object, qParams: object) => void;
  updateUserAddressResponse: object;
  resetForm: (formName: string) => void;
}
interface state {
  postCode: string;
  loading: boolean;
}

export class UnConnectedUserAddress extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      postCode: '',
      loading: false,
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }
  componentDidMount() {
    if (
      !Object.keys(
        _get(this.props.getUserInfoResponse, DB_KEYS.ADDRESS_RESPONSE, {}),
      ).length
    )
      this.props.resetForm(APP_CONSTANTS.USER_ADDRESS_FORM);
  }
  getAddressPayload = (formValues: object, isEdit: boolean) => {
    const {getUserInfoResponse} = this.props;
    if (isEdit) {
      let isAddressChanged =
        _get(getUserInfoResponse, DB_KEYS.ADDRESS_LINE_1, '') ===
          _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE1,
            '',
          ) &&
        _get(getUserInfoResponse, DB_KEYS.ADDRESS_LINE_2, '') ===
          (_get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE2,
            '',
          ) === ''
            ? null
            : _get(
                formValues,
                FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE2,
                '',
              )) &&
        _get(getUserInfoResponse, DB_KEYS.CITY, '') ===
          _get(formValues, FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY, '') &&
        _get(getUserInfoResponse, DB_KEYS.COUNTY, '') ===
          (_get(formValues, FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.COUNTY, '') ===
          ''
            ? null
            : _get(
                formValues,
                FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.COUNTY,
                '',
              )) &&
        _get(getUserInfoResponse, DB_KEYS.POST_CODE, '') ===
          _get(formValues, FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE, '');
      if (isAddressChanged) {
        return null;
      }
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
  handleStageSubmission = async (
    formValues: object,
    selectedAddressIndex: number,
  ) => {
    let isAddressChanged = true;
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
      const payload = this.getAddressPayload(formValues, true);
      if (payload) {
        await updateUserAddress(payload, {
          id: _get(getUserInfoResponse, DB_KEYS.USER_ADDRESS_ID, null),
        });
        if (
          !_get(
            this.props.updateUserAddressResponse,
            DB_KEYS.IS_ADDRESS_VERIFIED,
            true,
          )
        ) {
          this.props.navigation.navigate(
            NAVIGATION_SCREEN_NAME.MANUAL_VALUATION_SCREEN,
          );
          this.setState({loading: false});
        }
      } else {
        isAddressChanged = false;
      }
    } else {
      const payload = this.getAddressPayload(formValues, false);
      if (payload) {
        await taskHandler(payload);
        if (
          !_get(
            this.props.taskHandlerResponse,
            DB_KEYS.IS_ADDRESS_VERIFIED,
            true,
          )
        ) {
          this.props.navigation.navigate(
            NAVIGATION_SCREEN_NAME.MANUAL_VALUATION_SCREEN,
          );
          this.setState({loading: false});
        }
      }
    }
    const {taskHandlerResponse, updateUserAddressResponse} = this.props;
    console.log('TASK SUBMISSION : TASK-1 : STAGE-2 :', taskHandlerResponse);
    if (!isAddressChanged) {
      await getUserInfo();
      this.props.navigation.navigate(
        NAVIGATION_SCREEN_NAME.USER_PROFILE_VIEW_MODE,
        {
          selectedAddressIndex: selectedAddressIndex,
          isAddressChanged: isAddressChanged,
        },
      );
    } else {
      if (
        !(
          _get(taskHandlerResponse, DB_KEYS.ERROR, false) ||
          _get(updateUserAddressResponse, DB_KEYS.ERROR, false)
        )
      ) {
        await getUserInfo();
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.HOME_OWNERSHIP, {
          lastRouteName: NAVIGATION_SCREEN_NAME.USER_ADDRESS,
        });
      }
    }
  };
  handleFormSubmit = (values: object) => {
    const {reducerResponse} = this.props;
    this.setState({loading: true});
    const selectedAddressIndex = _get(
      this.props.navigation,
      STATE_PARAMS.SELECTED_SEARCH_ADDRESS_INDEX,
      null,
    );
    /*
    NOTES : This part of code is Commmented, to be kept for future reference
    */
    /*
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
    }
    */
    this.handleStageSubmission(values, selectedAddressIndex);
  };
  handleCompleteLater = () => {
    _get(this.props.navigation, STATE_PARAMS.IS_FIRST_ROUTE, false)
      ? this.props.navigation.goBack()
      : resetNavigation(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
          isUserDataChanged: true,
        });
  };
  handleAddressSearch = async () => {
    const {getAddress} = this.props;
    const {postCode} = this.state;
    if (postCode) {
      if (APP_REGEX.POST_CODE_UK.test(postCode)) {
        //As per postCode rules in UK
        //API call to search address based on Post Code
        const payload = {
          postcode: postCode,
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
    const {
      handleSubmit,
      getAddressResponse,
      taskHandlerResponse,
      updateUserAddressResponse,
      getUserInfoResponse,
    } = this.props;
    const isFormValuesFilled =
      (_get(
        this.props.reducerResponse,
        DB_KEYS.USER_ADDRESS.ADDRESS_LINE_1,
        null,
      ) &&
        _get(this.props.reducerResponse, DB_KEYS.USER_ADDRESS.CITY, null) &&
        _get(
          this.props.reducerResponse,
          DB_KEYS.USER_ADDRESS.POST_CODE,
          null,
        )) ||
      _get(getUserInfoResponse, DB_KEYS.ADDRESS_RESPONSE, false);
    if (this.state.loading)
      return <LoadingModal loadingText="Validating address..." />;
    else
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
                maxLength={8}
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
                name="address_line_1"
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
                name="address_line_2"
                label={localeString(LOCALE_STRING.USER_PROFILE.STREET_NAME)}
                fieldLabelStyle={styles.fieldLabelStyle}
                component={ReduxFormField}
                props={{
                  style: styles.formInput,
                  autoCapitalize: false,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                }}
                validate={[alphaNumeric]}
              />
              <Field
                name="town_or_city"
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
                name="county_or_region"
                label={localeString(LOCALE_STRING.USER_PROFILE.COUNTY)}
                fieldLabelStyle={styles.fieldLabelStyle}
                component={ReduxFormField}
                props={{
                  style: styles.formInput,
                  autoCapitalize: false,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                }}
                validate={[alphaNumeric]}
              />
              <Field
                name="postcode"
                label={localeString(LOCALE_STRING.USER_PROFILE.POST_CODE)}
                fieldLabelStyle={styles.fieldLabelStyle}
                component={ReduxFormField}
                props={{
                  maxLength: 8,
                  autoCapitalize: 'characters',
                  autoCorrect: false,
                  style: styles.formInput,
                  autoCapitalize: false,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                }}
                validate={[alphaNumeric, required]}
              />
              <Button
                title={localeString(LOCALE_STRING.USER_PROFILE.NEXT)}
                titleStyle={styles.buttonTextStyle}
                onPress={handleSubmit(this.handleFormSubmit)}
                buttonStyle={styles.buttonStyle}
                disabled={!isFormValuesFilled}
                loading={
                  _get(taskHandlerResponse, DB_KEYS.IS_FETCHING, false) ||
                  _get(updateUserAddressResponse, DB_KEYS.IS_FETCHING, false)
                }
              />
              {_get(this.props.navigation, STATE_PARAMS.TASK_ID, null) &&
                _get(this.props.navigation, STATE_PARAMS.STAGE_ID, null) && (
                  <TouchableOpacity
                    style={styles.completeLaterContainer}
                    hitSlop={APP_CONSTANTS.HIT_SLOP}
                    onPress={() => this.handleCompleteLater()}>
                    <Text style={styles.completeLaterText}>
                      {localeString(LOCALE_STRING.USER_PROFILE.COMPLETE_LATER)}
                    </Text>
                  </TouchableOpacity>
                )}
            </KeyboardAwareScrollView>
          </View>
        </View>
      );
  }
}
export const UserAddressForm = reduxForm({
  form: APP_CONSTANTS.USER_ADDRESS_FORM,
})(UnConnectedUserAddress);

const mapStateToProps = (state: object) => ({
  initialValues: {
    address_line_1: _get(state, DB_KEYS.GET_USER_INFO.HOUSE_NUMBER, '')
      ? _get(state, DB_KEYS.GET_USER_INFO.HOUSE_NUMBER, '')
      : '',
    address_line_2: _get(state, DB_KEYS.GET_USER_INFO.STREET_NAME, '')
      ? _get(state, DB_KEYS.GET_USER_INFO.STREET_NAME, '')
      : '',
    town_or_city: _get(state, DB_KEYS.GET_USER_INFO.CITY, '')
      ? _get(state, DB_KEYS.GET_USER_INFO.CITY, '')
      : '',
    county_or_region: _get(state, DB_KEYS.GET_USER_INFO.COUNTY, '')
      ? _get(state, DB_KEYS.GET_USER_INFO.COUNTY, '')
      : '',
    postcode: _get(state, DB_KEYS.GET_USER_INFO.POST_CODE, '')
      ? _get(state, DB_KEYS.GET_USER_INFO.POST_CODE, '')
      : '',
  },
  reducerResponse: state.form,
  getAddressResponse: state.getAddress,
  getUserInfoResponse: state.getUserInfo,
  taskHandlerResponse: state.taskHandler,
  updateUserAddressResponse: state.updateUserAddress,
});

const bindActions = dispatch => ({
  getAddress: payload => dispatch(getAddress.fetchCall(payload)),
  taskHandler: (payload, extraPayload) =>
    dispatch(taskHandler.fetchCall(payload, extraPayload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  updateUserAddress: (payload, extraPayload) =>
    dispatch(updateUserAddress.fetchCall(payload, extraPayload)),
  resetForm: formName => dispatch(reset(formName)),
});

export const UserAddress = connect(
  mapStateToProps,
  bindActions,
)(UserAddressForm);

import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {Field, reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Header,
  ReduxFormField,
  GeneralStatusBar,
  LoadingModal,
} from '../../components';
import {chatIcon, iEdit} from '../../assets';
import {reset} from '../../navigation/navigationService';
import {get as _get} from 'lodash';
import {getUserInfo} from '../../store/reducers';
import {
  mapFormValues,
  alphaNumeric,
  required,
  alphaBets,
  dobValidation,
  localeString,
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  DB_KEYS,
  FE_FORM_VALUE_CONSTANTS,
  STATE_PARAMS,
  PAYLOAD_KEYS,
} from '../../utils';
import {styles} from './styles';
interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  reducerResponse: object;
  getUserInfoResponse: object;
  getUserAddress: (payload: object, qParam: object) => void;
  getUserAddressResponse: object;
  taskHandlerResponse: object;
  getUserInfo: () => void;
}
interface state {
  loading: boolean;
}

export class UnConnectedUserProfileViewMode extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount = async () => {
    /*
    NOTES : Default address added for now, actual data will be fetched from user API and mapped accordingly
    */
    if (
      !_get(
        this.props.navigation,
        STATE_PARAMS.SELECTED_SEARCH_ADDRESS_INDEX,
        null,
      )
    ) {
      const {getUserInfo} = this.props;
      await getUserInfo();
    }
    this.setState({loading: false});
  };
  handleFormDataMappings = (formName: string) => {
    const {reducerResponse} = this.props;
    const currentFormValues = {
      FIRST_NAME: _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE}.values.firstName`,
        null,
      ),
      LAST_NAME: _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE}.values.lastName`,
        null,
      ),
      DOB: _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE}.values.dateOfBirth`,
        null,
      ),
      ADDRESS: _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE}.values.address`,
        null,
      ),
    };
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.FIRST_NAME,
      currentFormValues.FIRST_NAME,
    );
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.LAST_NAME,
      currentFormValues.LAST_NAME,
    );
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.DATE_OF_BIRTH,
      currentFormValues.DOB,
    );
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.ADDRESS,
      currentFormValues.ADDRESS,
    );
  };
  handleDonePressed = () => {
    const {taskHandlerResponse} = this.props;
    reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
      isUserDataChanged: _get(taskHandlerResponse, DB_KEYS.RESPONSE, null)
        ? true
        : false,
    });
  };
  handleEditPress = () => {
    const {navigation, getUserAddressResponse} = this.props;
    this.handleFormDataMappings(APP_CONSTANTS.USER_PROFILE_FORM);
    /*
    NOTES : //data[0] to be changed later after BE update
    */
    navigation.navigate(NAVIGATION_SCREEN_NAME.USER_PROFILE, {
      detailedAddress: _get(getUserAddressResponse, 'response.data[0]', {}),
    });
  };
  render() {
    const {reducerResponse} = this.props;
    const {loading} = this.state;
    const isEditEnabled =
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.FIRST_NAME, false) &&
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.LAST_NAME, false) &&
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.DOB, false) &&
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.ADDRESS, false);
    if (loading) return <LoadingModal loadingText="Loading..." />;
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
              contentContainerStyle={styles.formScrollableView}>
              <View style={styles.editModeView}>
                <Text style={styles.aboutYouText}>
                  {localeString(LOCALE_STRING.USER_PROFILE.ABOUT_YOU)}
                </Text>
                <TouchableOpacity
                  onPress={() => this.handleEditPress()}
                  disabled={!isEditEnabled}
                  style={styles.editModeTouch}>
                  <Image
                    source={iEdit}
                    height={STYLE_CONSTANTS.margin.SMALL}
                    width={STYLE_CONSTANTS.margin.SMALL}
                    resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
                  />
                  <Text style={styles.editText}>
                    {localeString(LOCALE_STRING.USER_PROFILE.EDIT)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fieldContainer}>
                <Field
                  name="firstName"
                  label={localeString(LOCALE_STRING.USER_PROFILE.FIRST_NAME)}
                  fieldLabelStyle={styles.fieldLabelStyle}
                  component={ReduxFormField}
                  props={{
                    style: styles.formInput,
                    autoCapitalize: false,
                    autoCorrect: false,
                    returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                    editable: false,
                  }}
                  validate={[alphaBets, required]}
                />
                <Field
                  name="lastName"
                  label={localeString(LOCALE_STRING.USER_PROFILE.LAST_NAME)}
                  fieldLabelStyle={styles.fieldLabelStyle}
                  component={ReduxFormField}
                  props={{
                    style: styles.formInput,
                    autoCapitalize: false,
                    autoCorrect: false,
                    returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                    editable: false,
                  }}
                  validate={[alphaBets, required]}
                />
                <Field
                  name="dateOfBirth"
                  label={localeString(LOCALE_STRING.USER_PROFILE.DOB)}
                  fieldLabelStyle={styles.fieldLabelStyle}
                  component={ReduxFormField}
                  props={{
                    maxLength: 10, //DOB
                    keyboardType: 'number-pad',
                    style: styles.formInput,
                    autoCapitalize: false,
                    autoCorrect: false,
                    returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                    editable: false,
                  }}
                  validate={[required, dobValidation]}
                />
                <Field
                  name="address"
                  label={localeString(LOCALE_STRING.USER_PROFILE.ADDRESS)}
                  fieldLabelStyle={styles.fieldLabelStyle}
                  component={ReduxFormField}
                  props={{
                    style: styles.formInput,
                    autoCapitalize: false,
                    autoCorrect: false,
                    returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                    multiline: true,
                    editable: false,
                  }}
                  validate={[alphaNumeric]}
                />
              </View>
            </KeyboardAwareScrollView>
            <Button
              title={localeString(LOCALE_STRING.USER_PROFILE.DONE)}
              titleStyle={styles.buttonTextStyle}
              onPress={() => this.handleDonePressed()}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      );
  }
}
/*
NOTES : InitialValues of forms to be handled
*/
export const UserProfileViewModeForm = reduxForm({
  form: APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE,
  enableReinitialize: true,
})(UnConnectedUserProfileViewMode);

const mapStateToProps = (state: object) => ({
  initialValues: {
    firstName: _get(state, DB_KEYS.PENDING_TASK.USER_INFO.FIRST_NAME, ''),
    lastName: _get(state, DB_KEYS.PENDING_TASK.USER_INFO.LAST_NAME, ''),
    dateOfBirth: _get(state, DB_KEYS.PENDING_TASK.USER_INFO.DOB, ''),
    /*
    NOTES : //data[0] to be changed later after BE update
    */
    address:
      _get(state, DB_KEYS.GET_USER_INFO.HOUSE_NUMBER, '') +
      ', ' +
      _get(state, DB_KEYS.GET_USER_INFO.STREET_NAME, '') +
      ',  ' +
      _get(state, DB_KEYS.GET_USER_INFO.CITY, '') +
      ', ' +
      _get(state, DB_KEYS.GET_USER_INFO.POST_CODE, ''),
  },
  reducerResponse: state.form,
  getUserInfoResponse: state.getUserInfo,
  taskHandlerResponse: state.taskHandler,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
});

export const UserProfileViewMode = connect(
  mapStateToProps,
  bindActions,
)(UserProfileViewModeForm);

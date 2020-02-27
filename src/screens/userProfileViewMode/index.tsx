import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Field, reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {chatIcon, iEdit} from '../../assets';
import {get as _get} from 'lodash';
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
} from '../../utils';
import {styles} from './styles';

const SAMPLE_USER_DATA = {
  FIRST_NAME: 'Mohit',
  LAST_NAME: 'Kumar',
  DOB: '06/04/1995',
  ADDRESS: {
    [FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.FLAT_NUMBER]: 'Defaul Flat 100',
    [FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.STREET_NAME]: 'Default street name',
    [FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY]: 'default city',
    [FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE]: 'default postcode',
  },
  COMPLETE_ADDRESS:
    'Defaul Flat 100, Default street name, default city, default postcode', //To check multiline
};
interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  reducerResponse: object;
}
interface state {}

export class UnConnectedUserProfileViewMode extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
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
      this.handleFormDataMappings(APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE);
    }
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
      currentFormValues.FIRST_NAME
        ? currentFormValues.FIRST_NAME
        : SAMPLE_USER_DATA.FIRST_NAME,
    );
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.LAST_NAME,
      currentFormValues.LAST_NAME
        ? currentFormValues.LAST_NAME
        : SAMPLE_USER_DATA.LAST_NAME,
    );
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.DATE_OF_BIRTH,
      currentFormValues.DOB ? currentFormValues.DOB : SAMPLE_USER_DATA.DOB,
    );
    mapFormValues(
      formName,
      FE_FORM_VALUE_CONSTANTS.USER_PROFILE.ADDRESS,
      currentFormValues.ADDRESS
        ? currentFormValues.ADDRESS
        : SAMPLE_USER_DATA.COMPLETE_ADDRESS,
    );
  };
  handleDonePressed = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
  };
  handleEditPress = () => {
    this.handleFormDataMappings(APP_CONSTANTS.USER_PROFILE_FORM);
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_PROFILE, {
      detailedAddress: SAMPLE_USER_DATA.ADDRESS,
    });
  };
  render() {
    const {reducerResponse} = this.props;
    const isEditEnabled =
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.FIRST_NAME, false) &&
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.LAST_NAME, false) &&
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.DOB, false) &&
      _get(reducerResponse, DB_KEYS.USER_PROFILE_VIEW_MODE.ADDRESS, false);
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
                validate={[alphaNumeric, required]}
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
  reducerResponse: state.form,
});

const bindActions = () => ({});

export const UserProfileViewMode = connect(
  mapStateToProps,
  bindActions,
)(UserProfileViewModeForm);

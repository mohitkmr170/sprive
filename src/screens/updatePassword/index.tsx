import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {
  GeneralStatusBar,
  Header,
  ReduxFormField,
  StatusOverlay,
} from '../../components';
import {iFail, iVerify} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as Progress from 'react-native-progress';
import {logoutUser} from '../../store/actions/actions';
import {
  minLength8,
  maxLength16,
  alphaNumeric,
  required,
  noWhiteSpaces,
  passMatching,
  localeString,
  showSnackBar,
  setAuthToken,
  checkPassMessagePercentage,
  getPasswordStrength,
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
  COLOR,
  PAYLOAD_KEYS,
} from '../../utils';
import {get as _get} from 'lodash';
import {getUserInfo, updatePassword} from '../../store/reducers';
import {reset} from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  getUserInfo: () => void;
  updatePassword: (payload: object, extraPayload: object) => void;
  getUserInfoResponse: object;
  reducerResponse: object;
  updatePasswordResponse: object;
  logoutUserAction: () => void;
}
interface state {
  existingPasswordVisibility: boolean;
  passwordVisibility: boolean;
  passStrengthMessage: string;
  isUpdateComplete: boolean;
  confirmPasswordVisibility: boolean;
}

export class UnconnectedUpdatePassword extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      existingPasswordVisibility: true,
      passwordVisibility: true,
      confirmPasswordVisibility: true,
      passStrengthMessage: '',
      isUpdateComplete: false,
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  /**
   * Funtion to get the strength of password
   * @param password : string : password to get strength
   */
  handlePassword(password: string) {
    getPasswordStrength(password)
      .then(res => {
        console.log('handlePassword : res =>', res);
        this.setState({passStrengthMessage: res});
      })
      .catch(err => console.log(err));
  }

  handleSubmition = async (values: object) => {
    const {updatePassword, getUserInfoResponse} = this.props;
    if (
      _get(values, DB_KEYS.UPDATE_PASSWORD.NEW_PASSWORD, '') ===
      _get(values, DB_KEYS.UPDATE_PASSWORD.RETYPE_PASSWORD, '')
    ) {
      const payload = {
        [PAYLOAD_KEYS.UPDATE_PASSWORD.CURRENT_PASSWORD]: _get(
          values,
          DB_KEYS.UPDATE_PASSWORD.EXISTING_PASSWORD,
          '',
        ),
        [PAYLOAD_KEYS.UPDATE_PASSWORD.NEW_PASSWORD]: _get(
          values,
          DB_KEYS.UPDATE_PASSWORD.NEW_PASSWORD,
          '',
        ),
      };

      const updatePasswordQueryParams: any = {
        [PAYLOAD_KEYS.USER_ID]: String(
          _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
        ),
      };

      await updatePassword(payload, updatePasswordQueryParams);

      this.setState({isUpdateComplete: true});
    }
  };

  async componentDidMount() {}

  handleOkayClick = () => {
    this.props.logoutUserAction();
    const {getUserInfoResponse} = this.props;
    setAuthToken(
      APP_CONSTANTS.FALSE_TOKEN,
      _get(getUserInfoResponse, DB_KEYS.CURRENT_USER_EMAIL, ''),
    )
      .then(response => {
        this.setState({isUpdateComplete: false});
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      })
      .catch(error => {
        showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
      });
  };

  render() {
    const {handleSubmit, updatePasswordResponse, navigation} = this.props;
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      existingPasswordVisibility,
    } = this.state;
    let passMessagePercentage = checkPassMessagePercentage(
      this.state.passStrengthMessage,
    );
    const isUpdatePasswordFailed = _get(
      updatePasswordResponse,
      DB_KEYS.ERROR,
      true,
    );
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          onBackPress={() => this.props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.middleContainer}>
            <Text style={styles.resetPasswordText}>
              {localeString(LOCALE_STRING.UPDATE_PASSWORD.UPDATE_PASSWORD)}
            </Text>
            <View style={{flex: 1}}>
              <Field
                name={DB_KEYS.UPDATE_PASSWORD.EXISTING_PASSWORD}
                label={localeString(
                  LOCALE_STRING.UPDATE_PASSWORD.EXISTING_PASSWORD,
                )}
                password={true}
                editIcon={true}
                onIconPress={() =>
                  this.setState({
                    existingPasswordVisibility: !existingPasswordVisibility,
                  })
                }
                component={ReduxFormField}
                props={{
                  maxLength: 16,
                  style: styles.emailInput,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  secureTextEntry: existingPasswordVisibility,
                  autoCapitalize: false,
                  placeholder: localeString(
                    LOCALE_STRING.RESET_PASSWORD.PLACEHOLDER_PASSWORD,
                  ),
                }}
                editIcon={true}
                validate={[
                  minLength8,
                  maxLength16,
                  alphaNumeric,
                  required,
                  noWhiteSpaces,
                ]}
                onSubmitEditing={handleSubmit(this.handleSubmition)}
              />
              <Field
                name={DB_KEYS.UPDATE_PASSWORD.NEW_PASSWORD}
                label={localeString(LOCALE_STRING.UPDATE_PASSWORD.NEW_PASSWORD)}
                password={true}
                editIcon={true}
                onIconPress={() =>
                  this.setState({passwordVisibility: !passwordVisibility})
                }
                component={ReduxFormField}
                props={{
                  maxLength: 16,
                  style: styles.emailInput,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  secureTextEntry: passwordVisibility,
                  autoCapitalize: false,
                  placeholder: localeString(
                    LOCALE_STRING.RESET_PASSWORD.PLACEHOLDER_PASSWORD,
                  ),
                  onChangeText: (password: string) =>
                    this.handlePassword(password),
                }}
                validate={[
                  minLength8,
                  maxLength16,
                  alphaNumeric,
                  required,
                  noWhiteSpaces,
                ]}
              />
              {_get(
                this.props.reducerResponse,
                DB_KEYS.UPDATE_PASSWORD_FORM,
                false,
              ) && (
                <View style={styles.passStrengthContainer}>
                  <View style={styles.passStrengthInnerContainer}>
                    <Progress.Bar
                      progress={passMessagePercentage}
                      color={COLOR.LIGHT_GREEN}
                      height={STYLE_CONSTANTS.margin.SMALLER}
                      width={null}
                      unfilledColor={COLOR.LIGHT_GRAY}
                      borderWidth={0}
                    />
                  </View>
                  <Text style={styles.passStrengthText}>
                    {this.state.passStrengthMessage}
                  </Text>
                </View>
              )}
              <Field
                name={DB_KEYS.UPDATE_PASSWORD.RETYPE_PASSWORD}
                label={localeString(
                  LOCALE_STRING.UPDATE_PASSWORD.RETYPE_PASSWORD,
                )}
                password={true}
                editIcon={true}
                onIconPress={() =>
                  this.setState({
                    confirmPasswordVisibility: !confirmPasswordVisibility,
                  })
                }
                component={ReduxFormField}
                props={{
                  maxLength: 16,
                  style: styles.emailInput,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  secureTextEntry: confirmPasswordVisibility,
                  autoCapitalize: false,
                  placeholder: localeString(
                    LOCALE_STRING.RESET_PASSWORD.PLACEHOLDER_PASSWORD,
                  ),
                }}
                editIcon={true}
                validate={[passMatching]}
                onSubmitEditing={handleSubmit(this.handleSubmition)}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              title={localeString(LOCALE_STRING.UPDATE_PASSWORD.UPDATE)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleSubmition)}
              buttonStyle={styles.buttonStyle}
              loading={_get(updatePasswordResponse, DB_KEYS.IS_FETCHING, false)}
            />
          </View>
        </KeyboardAwareScrollView>
        {this.state.isUpdateComplete && (
          <StatusOverlay
            icon={isUpdatePasswordFailed ? iFail : iVerify}
            firstButtonText={localeString(
              LOCALE_STRING.EMAIL_VERIFICATION.OKAY,
            )}
            handleFirstButton={() => {
              isUpdatePasswordFailed
                ? this.props.navigation.navigate(
                    NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
                  )
                : this.handleOkayClick();
            }}
            mainMessage={
              isUpdatePasswordFailed
                ? localeString(LOCALE_STRING.UPDATE_PASSWORD.UPDATE_FAIL)
                : localeString(LOCALE_STRING.UPDATE_PASSWORD.UPDATE_SUCCESS)
            }
            infoTitle={
              isUpdatePasswordFailed
                ? _get(
                    updatePasswordResponse,
                    DB_KEYS.VERIFICATION_ERROR_MESSAGE,
                    APP_CONSTANTS.GENERAL_ERROR,
                  )
                : _get(
                    updatePasswordResponse,
                    DB_KEYS.RESPONSE_MESSAGE,
                    DB_KEYS.SUCCESS,
                  )
            }
          />
        )}
      </View>
    );
  }
}
export const UpdatePasswordForm = reduxForm({
  form: DB_KEYS.FORM.UPDATE_PASSWORD,
  destroyOnUnmount: true,
})(UnconnectedUpdatePassword);
const mapStateToProps = state => ({
  reducerResponse: state.form,
  getUserInfoResponse: state.getUserInfo,
  updatePasswordResponse: state.updatePassword,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  updatePassword: (payload: object, extraPayload: object) =>
    dispatch(updatePassword.fetchCall(payload, extraPayload)),
  logoutUserAction: () => dispatch(logoutUser()),
});

export const UpdatePassword = connect(
  mapStateToProps,
  bindActions,
)(UpdatePasswordForm);

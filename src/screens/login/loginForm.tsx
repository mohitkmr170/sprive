import React from 'react';
import {View, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {
  Header,
  ReduxFormField,
  GeneralStatusBar,
  ServerErrorContainer,
} from '../../components';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {loginUser, getUserInfo} from '../../store/reducers';
import {get as _get} from 'lodash';
import {reset as resetNavigation} from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  setAuthToken,
  showSnackBar,
  localeString,
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
  noWhiteSpaces,
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  DB_KEYS,
  PAYLOAD_KEYS,
  BIOMETRIC_KEYS,
  BIOMETRY_TYPE,
  STYLE_CONSTANTS,
} from '../../utils';
import OneSignal from 'react-native-onesignal';
import FingerprintScanner from 'react-native-fingerprint-scanner';
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  getUserInfo: () => void;
  getUserInfoResponse: object;
  loginUserResponse: object;
  loginUser: (payload: object) => void;
  reducerResponse: object;
  handlePopupDismissed: () => void;
}
interface state {
  passwordVisibility: boolean;
  serverError: {
    email: string;
    password: string;
  };
}

class UnConnectedLoginScreen extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passwordVisibility: true,
      serverError: {
        email: '',
        password: '',
      },
    };
  }

  handleFaceIdError = (errorKey: string) => {
    Alert.alert(errorKey, '', [
      {
        text: localeString(LOCALE_STRING.SECURE_LOGIN.ENTER_PIN),
        onPress: () => {
          this.handlePinVerification();
        },
      },
    ]);
  };

  biometricAuthentication = () => {
    FingerprintScanner.isSensorAvailable()
      .then(biometrictype => {
        console.log(
          'biometrictype success ::',
          JSON.parse(JSON.stringify(biometrictype)),
        );
        const description: string = `Scan you ${biometrictype} to proceed`;
        FingerprintScanner.authenticate({
          description: description,
          fallbackEnabled: true,
        })
          .then(() => {
            this.handleLogin();
            this.props.handlePopupDismissed();
          })
          .catch((error: object) => {
            // this.props.handlePopupDismissed();
            const biometricValidaitionError = JSON.parse(JSON.stringify(error));
            console.log(
              'biometric validation error',
              JSON.parse(JSON.stringify(error)),
            );
            if (
              biometricValidaitionError.name ===
                BIOMETRIC_KEYS.CTA.USER_FALLBACK ||
              biometricValidaitionError.name === BIOMETRIC_KEYS.CTA.CANCEL
            )
              this.handlePinVerification();
          });
      })
      .catch(error => {
        const sensorError = JSON.parse(JSON.stringify(error));
        console.log('biometrictype error ::', sensorError);
        if (
          _get(sensorError, BIOMETRIC_KEYS.BIOMETRIC, '') ===
          BIOMETRY_TYPE.FACE_ID
        ) {
          let faceIdError = _get(sensorError, BIOMETRIC_KEYS.NAME, '');
          switch (faceIdError) {
            case BIOMETRIC_KEYS.ERROR_KEY.NOT_ENROLLED:
              this.handleFaceIdError(
                localeString(LOCALE_STRING.SECURE_LOGIN.FACE_ID_NOT_ENROLLED),
              );
              break;
            case BIOMETRIC_KEYS.ERROR_KEY.NOT_AVAILABLE:
              this.handleFaceIdError(
                localeString(LOCALE_STRING.SECURE_LOGIN.FACE_NOT_AVAILABLE),
              );
              break;
            default:
              this.handleFaceIdError(
                localeString(LOCALE_STRING.SECURE_LOGIN.GENERAL_FACE_ID_ERROR),
              );
          }
        }
      });
  };

  handleBackPress = () => {
    resetNavigation(NAVIGATION_SCREEN_NAME.INTRO_CAROUSEL);
  };

  handlePinVerification = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.VERIFY_PIN_SCREEN);
  };

  handleLogin = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
  };

  biometricCheck = () => {
    const {getUserInfoResponse} = this.props;
    if (Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_ANDROID) {
      if (_get(getUserInfoResponse, DB_KEYS.IS_PIN_ENABLED, false)) {
        // pinAuth = true
        this.handlePinVerification();
      } else {
        this.handleLogin();
      }
    } else {
      if (
        !_get(getUserInfoResponse, DB_KEYS.IS_FACE_ID_ENABLED, false) &&
        !_get(getUserInfoResponse, DB_KEYS.IS_PIN_ENABLED, false)
      ) {
        // Two factor auth not enabled
        this.handleLogin();
      } else if (
        // pinAuth = true && faceID = true
        _get(getUserInfoResponse, DB_KEYS.IS_PIN_ENABLED, false) &&
        _get(getUserInfoResponse, DB_KEYS.IS_FACE_ID_ENABLED, false)
      ) {
        this.biometricAuthentication();
      } else {
        //pinAuth = true
        this.handlePinVerification();
      }
    }
  };

  preLoginCheck = async () => {
    const {getUserInfo, navigation} = this.props;
    await getUserInfo();
    const {getUserInfoResponse} = this.props;
    if (!_get(getUserInfoResponse, DB_KEYS.ERROR, null)) {
      if (
        _get(
          getUserInfoResponse,
          DB_KEYS.VERIFICATION_FLOW.DATA_OF_IS_VERIFIED,
          true,
        )
      ) {
        const externalUserId = _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          '',
        );
        if (externalUserId) {
          OneSignal.setExternalUserId(externalUserId);
        }
        this.biometricCheck();
      } else {
        const {reducerResponse} = this.props;
        if (
          _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT, null) &&
          _get(reducerResponse, DB_KEYS.FORM_MORTGAGE_TIMEPERIOD, null) &&
          _get(
            reducerResponse,
            DB_KEYS.FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT,
            null,
          )
        ) {
          showSnackBar(
            {},
            localeString(LOCALE_STRING.EMAIL_VERIFICATION.USER_NOT_VERIFIED),
          );
          navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL); //Mortgage not available to verify, need to add some condition based on discussion!s
        } else {
          showSnackBar(
            {},
            localeString(LOCALE_STRING.LOGIN_SCREEN.MORTGAGE_NOT_FOUND),
          );
          navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
        }
      }
    }
  };

  handleLoginPress = async (values: {email: string; password: string}) => {
    console.log(
      'handleLoginPress : check value entered in Fields, values.email =>',
      values.email,
    );
    const {loginUser} = this.props;
    const payload = {
      [PAYLOAD_KEYS.LOGIN.STRATEGY]: 'local',
      [PAYLOAD_KEYS.LOGIN.EMAIL]: values.email ? values.email : '',
      [PAYLOAD_KEYS.LOGIN.PASSWORD]: values.password ? values.password : '',
    };
    await loginUser(payload);
    const {loginUserResponse} = this.props;
    if (_get(loginUserResponse, DB_KEYS.ACCESS_TOKEN, null)) {
      setAuthToken(
        _get(loginUserResponse, DB_KEYS.ACCESS_TOKEN, null),
        values.email,
      )
        .then(async response => this.preLoginCheck())
        .catch(err => {
          /*
          TODO : Snackbar to be added
          */
          console.error(err);
        });
    } else {
      let currentServerError = this.state.serverError;
      currentServerError.email = _get(
        loginUserResponse,
        DB_KEYS.BE_EMAIL_ERROR,
        '',
      );
      currentServerError.password = _get(
        loginUserResponse,
        DB_KEYS.BE_PASSWORD_ERROR,
        '',
      );
      this.setState({
        serverError: currentServerError,
      });
    }
  };

  hideServerError = () => {
    this.setState({
      serverError: {},
    });
  };

  handleSignUpPress = () => {
    resetNavigation(NAVIGATION_SCREEN_NAME.INTRO_CAROUSEL);
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.FORGOT_PASSWORD);
  };

  render() {
    const {passwordVisibility} = this.state;
    const {handleSubmit, loginUserResponse} = this.props;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.LOGIN_SCREEN.LOGIN_BUTTON)}
          onBackPress={() => this.handleBackPress()}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.topContainer}>
          <View style={styles.firstContainer}>
            <Text style={styles.signInText}>
              {localeString(LOCALE_STRING.LOGIN_SCREEN.SIGNIN_TO_ACCOUNT)}
            </Text>
            <View>
              <Field
                name="email"
                label="Email Address"
                component={ReduxFormField}
                props={{
                  keyboardType: 'email-address',
                  style: styles.emailInput,
                  autoCapitalize: 'none',
                  placeholder: 'Email',
                }}
                editIcon={true}
                onFocus={() => this.hideServerError()}
                validate={[email, required]}
              />
              {_get(
                this.state.serverError,
                APP_CONSTANTS.ERROR_STATE_VALUES.EMAIL,
                null,
              ) ? (
                <ServerErrorContainer
                  serverError={this.state.serverError.email}
                />
              ) : null}
            </View>
            <View>
              <Field
                name="password"
                label="Password"
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
                  autoCapitalize: 'none',
                  placeholder: 'Password',
                }}
                editIcon={true}
                onFocus={() => this.hideServerError()}
                validate={[
                  minLength8,
                  maxLength16,
                  alphaNumeric,
                  required,
                  noWhiteSpaces,
                ]}
                onSubmitEditing={handleSubmit(this.handleLoginPress)}
              />
              {_get(
                this.state.serverError,
                APP_CONSTANTS.ERROR_STATE_VALUES.PASSWORD,
                null,
              ) ? (
                <ServerErrorContainer
                  serverError={this.state.serverError.password}
                />
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => this.handleForgotPassword()}>
              <Text style={styles.forgotPassword}>
                {localeString(LOCALE_STRING.LOGIN_SCREEN.FORGOT_PASSWORD)}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title={localeString(LOCALE_STRING.LOGIN_SCREEN.LOGIN_BUTTON)}
            titleStyle={styles.buttonTitleStyle}
            onPress={handleSubmit(this.handleLoginPress)}
            buttonStyle={styles.buttonExtStyle}
            loading={_get(loginUserResponse, DB_KEYS.IS_FETCHING, false)}
          />
          <Text style={styles.switchToSignUpText}>
            {localeString(LOCALE_STRING.LOGIN_SCREEN.DONT_HAVE_ACCOUNT)}{' '}
            <Text
              onPress={() => this.handleSignUpPress()}
              style={{fontWeight: 'bold'}}>
              {localeString(LOCALE_STRING.LOGIN_SCREEN.SIGNUP)}
            </Text>
          </Text>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
export const LoginScreen = reduxForm({
  form: APP_CONSTANTS.LOGIN_FORM,
})(UnConnectedLoginScreen);

const mapStateToProps = state => ({
  loginUserResponse: state.loginUser,
  getUserInfoResponse: state.getUserInfo,
  reducerResponse: state.form,
});

const bindActions = dispatch => ({
  loginUser: payload => dispatch(loginUser.fetchCall(payload)),
  getUserInfo: payload => dispatch(getUserInfo.fetchCall(payload)), // requires form name
});

export const LoginForm = connect(
  mapStateToProps,
  bindActions,
)(LoginScreen);

import React from 'react';
import {View, Alert, Text, StatusBar} from 'react-native';
import * as Progress from 'react-native-progress';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {
  Header,
  ReduxFormField,
  GeneralStatusBar,
  ServerErrorContainer,
} from '../../components';
import {
  getPasswordStrength,
  minPasswordStrength,
  checkPassMessagePercentage,
  setAuthToken,
  localeString,
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
  noWhiteSpaces,
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  COLOR,
  PAYLOAD_KEYS,
  WEB_VIEW_PARAMS,
} from '../../utils';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {signUpUser, setUserMortgage, getUserInfo} from '../../store/reducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface props {
  navigation: {
    navigate: (routeName: String, params?: object) => void;
    goBack: () => void;
  };
  signUpUser: (payload: object) => void;
  setUserMortgage: (payload: object) => void;
  getUserInfo: () => void;
  signUpUserResponse: object;
  getUserInfoResponse: object;
  setUserMortgageResponse: object;
  reducerResponse: object;
  handleSubmit: (values?: {email: string; password: string}) => void;
}

interface state {
  passStrengthMessage: string;
  passwordVisibility: boolean;
  serverError: {
    email: string;
    password: string;
  };
}

class UnConnectedSignUpForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passStrengthMessage: '',
      passwordVisibility: true,
      serverError: {
        email: '',
        password: '',
      },
    };
  }

  componentDidMount = () => {};

  handleSignUpSubmit = async (values: {email: string; password: string}) => {
    const {
      navigation,
      signUpUser,
      setUserMortgage,
      reducerResponse,
      getUserInfo,
    } = this.props;
    const payload = {
      [PAYLOAD_KEYS.SIGNUP.EMAIL]: values.email ? values.email : '',
      [PAYLOAD_KEYS.SIGNUP.PASSWORD]: values.password ? values.password : '',
    };
    await signUpUser(payload);
    const {signUpUserResponse} = this.props;
    if (!_get(signUpUserResponse, DB_KEYS.ERROR, null)) {
      await setAuthToken(
        _get(signUpUserResponse, DB_KEYS.ACCESS_DATA_TOKEN, null),
        values.email,
      );
      /*
      NOTES : Verify flow starts here
      */
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
    } else {
      let currentServerError = this.state.serverError;
      currentServerError.email = _get(
        signUpUserResponse,
        DB_KEYS.BE_EMAIL_ERROR,
        '',
      );
      currentServerError.password = _get(
        signUpUserResponse,
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

  handleBackPress = () => {
    StatusBar.setHidden(false, 'fade');
    this.props.navigation.goBack();
  };

  handleTermAndConditionClick = () => {
    /*
    TODO : Onlick of T&C to be handled
    */
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.GENERIC_WEB_VIEW, {
      webViewUri: WEB_VIEW_PARAMS.WEB_VIEW_URI_TERMS,
    });
  };

  handlePrivacyPolicyClick = () => {
    /*
    TODO : Onlick of Privacy prolicy to be handled
    */
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.GENERIC_WEB_VIEW, {
      webViewUri: WEB_VIEW_PARAMS.WEB_VIEW_URI_PRIVACY,
    });
  };

  handleSignInPress = () => {
    this.props.reset(APP_CONSTANTS.SIGNUP_FORM);
    this.hideServerError();
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
  };

  render() {
    const {handleSubmit, signUpUserResponse} = this.props;
    const {passwordVisibility} = this.state;
    let passMessagePercentage = checkPassMessagePercentage(
      this.state.passStrengthMessage,
    );
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.SIGNUP_FORM.SIGNUP_BUTTON)}
          onBackPress={() => this.handleBackPress()}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
            marginTop: STYLE_CONSTANTS.margin.NORMAL,
          }}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.topContainer}>
            {/* <View style={{flexDirection: 'row'}}>
              <Text style={styles.registrationText}>
                {localeString(LOCALE_STRING.SIGNUP_FORM.REG_AND_SEC)}
              </Text> */}
            {/* To be changed to actual progress state */}
            {/* <Text style={styles.progressStatusText}>2/4</Text>
            </View> */}
            <Text style={styles.accountSetupText}>
              {localeString(LOCALE_STRING.SIGNUP_FORM.SETUP_ACCOUNT)}
            </Text>
            <View style={styles.middleContainer}>
              <View style={{flex: 1}}>
                <View>
                  <Field
                    name="email"
                    label="Email Address"
                    editIcon={true}
                    component={ReduxFormField}
                    props={{
                      keyboardType: 'email-address',
                      style: styles.emailInput,
                      autoCapitalize: 'none',
                      placeholder: 'Email',
                    }}
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
                      secureTextEntry: passwordVisibility,
                      autoCapitalize: 'none',
                      returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                      placeholder: 'Password',
                      onChangeText: (password: string) =>
                        this.handlePassword(password),
                    }}
                    onFocus={() => this.hideServerError()}
                    validate={[
                      minLength8,
                      maxLength16,
                      alphaNumeric,
                      required,
                      noWhiteSpaces,
                      minPasswordStrength,
                    ]}
                    onSubmitEditing={handleSubmit(this.handleSignUpSubmit)}
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
                {_get(
                  this.props.reducerResponse,
                  DB_KEYS.SIGNUP_PASSWORD,
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
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.bottomText}>
                {localeString(LOCALE_STRING.SIGNUP_FORM.BY_CLICKING)}{' '}
                <Text
                  onPress={() => this.handleTermAndConditionClick()}
                  style={styles.decoratedText}>
                  {localeString(LOCALE_STRING.SIGNUP_FORM.TERMS_AND_CONDITION)}
                </Text>{' '}
                {localeString(LOCALE_STRING.SIGNUP_FORM.AND_OUR)}{' '}
                <Text
                  onPress={() => this.handlePrivacyPolicyClick()}
                  style={styles.decoratedText}>
                  {localeString(LOCALE_STRING.SIGNUP_FORM.PRIVACY_POLICY)}
                </Text>
              </Text>
            </View>
            <Button
              title={localeString(LOCALE_STRING.SIGNUP_FORM.SIGNUP_BUTTON)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleSignUpSubmit)}
              buttonStyle={styles.buttonStyle}
              loading={_get(signUpUserResponse, DB_KEYS.IS_FETCHING, false)}
            />
            <Text style={styles.switchToSignUpText}>
              {localeString(LOCALE_STRING.SIGNUP_FORM.ACCOUNT_EXIST)}
              {''}
              <Text
                onPress={() => this.handleSignInPress()}
                style={{fontWeight: 'bold'}}>
                {' '}
                {localeString(LOCALE_STRING.LOGIN_SCREEN.LOGIN_SIGNIN)}
              </Text>
            </Text>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

export const SignUpScreen = reduxForm({
  form: APP_CONSTANTS.SIGNUP_FORM,
})(UnConnectedSignUpForm);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
  signUpUserResponse: state.signUpUser,
  setUserMortgageResponse: state.setUserMortgage,
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({
  signUpUser: payload => dispatch(signUpUser.fetchCall(payload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  setUserMortgage: payload => dispatch(setUserMortgage.fetchCall(payload)),
  reset,
});

export const SignUpForm = connect(
  mapStateToProps,
  bindActions,
)(SignUpScreen);

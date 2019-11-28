import React from 'react';
import {View, Alert, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {localeString} from '../../utils/i18n';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {signUpUser, setUserMortgage, getUserInfo} from '../../store/reducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
} from '../../utils/validate';
import {
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils/constants';
import {
  getPasswordStrength,
  checkPassMessagePercentage,
  setAuthToken,
  resetAuthToken,
} from '../../utils/helperFunctions';
import {COLOR} from '../../utils/colors';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
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
}

class UnConnectedSignUpForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passStrengthMessage: '',
      passwordVisibility: true,
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
      [PAYLOAD_KEYS.SIGNUP.EMAIL]: values.email,
      [PAYLOAD_KEYS.SIGNUP.PASSWORD]: values.password,
    };
    await signUpUser(payload);
    const {signUpUserResponse} = this.props;
    if (!_get(signUpUserResponse, DB_KEYS.ERROR, null)) {
      await setAuthToken(
        _get(signUpUserResponse, DB_KEYS.ACCESS_TOKEN, null),
        values.email,
      );
      // getUserInfo API call
      await getUserInfo();
      const {getUserInfoResponse} = this.props;
      if (_get(getUserInfoResponse, DB_KEYS.ERROR, null)) {
        navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      } else {
        const mortgageData = {
          mortgage_balance: _get(
            reducerResponse,
            DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT,
            '',
          ).replace(/,/g, ''),
          mortgage_term: _get(
            reducerResponse,
            DB_KEYS.FORM_MORTGAGE_TIMEPERIOD,
            '',
          ).replace(/,/g, ''),
          mortgage_payment: _get(
            reducerResponse,
            DB_KEYS.FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT,
            '',
          ).replace(/,/g, ''),
          user_id: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
        };
        await setUserMortgage(mortgageData);
        const {setUserMortgageResponse} = this.props;
        if (!_get(setUserMortgageResponse, DB_KEYS.RESPONSE_DATA, null)) {
          await resetAuthToken();
          navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
        } else {
          navigation.navigate(NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN);
        }
      }
    }
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
    this.props.navigation.goBack();
  };

  handleTermAndConditionClick = () => {
    /*
    TODO : Onlick of T&C to be handled
    */
  };

  handlePrivacyPolicyClick = () => {
    /*
    TODO : Onlick of Privacy prolicy to be handled
    */
  };

  handleSignInPress = () => {
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.registrationText}>
                {localeString(LOCALE_STRING.SIGNUP_FORM.REG_AND_SEC)}
              </Text>
              {/* To be changed to actual progress state */}
              <Text style={styles.progressStatusText}>2/4</Text>
            </View>
            <Text style={styles.accountSetupText}>
              {localeString(LOCALE_STRING.SIGNUP_FORM.SETUP_ACCOUNT)}
            </Text>
            <View style={styles.middleContainer}>
              <View style={{flex: 1}}>
                <Field
                  name="email"
                  label="Email Address"
                  editIcon={true}
                  component={ReduxFormField}
                  props={{
                    keyboardType: 'email-address',
                    style: styles.emailInput,
                    returnKeyType: 'done',
                    autoCapitalize: false,
                    placeholder: 'Email',
                  }}
                  validate={[email, required]}
                />
                <Field
                  name="password"
                  label="Password"
                  editIcon={true}
                  onIconPress={() =>
                    this.setState({passwordVisibility: !passwordVisibility})
                  }
                  component={ReduxFormField}
                  props={{
                    maxLength: 16,
                    style: styles.emailInput,
                    secureTextEntry: passwordVisibility,
                    autoCapitalize: false,
                    placeholder: 'Password',
                    onChangeText: (password: string) =>
                      this.handlePassword(password),
                  }}
                  validate={[minLength8, maxLength16, alphaNumeric, required]}
                />
                {_get(
                  this.props.reducerResponse,
                  'signup.values.password',
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
                  {localeString(LOCALE_STRING.SIGNUP_FORM.TERMS_AND_CONDITION)}{' '}
                </Text>
                {localeString(LOCALE_STRING.SIGNUP_FORM.AND_OUR)}
                <Text
                  onPress={() => this.handlePrivacyPolicyClick()}
                  style={styles.decoratedText}>
                  {' '}
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
              <Text onPress={() => this.handleSignInPress()}>
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
});

export const SignUpForm = connect(
  mapStateToProps,
  bindActions,
)(SignUpScreen);

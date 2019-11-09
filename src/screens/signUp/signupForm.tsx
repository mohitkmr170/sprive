import React from 'react';
import {View, Alert, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField} from '../../components';
import {localeString} from '../../utils/i18n';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {signUpUser} from '../../store/reducers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
} from '../../utils/validate';
import {STYLE_CONSTANTS, LOCALE_STRING} from '../../utils/constants';
import {APP_CONSTANTS, NAVIGATION_SCREEN_NAME} from '../../utils/constants';
import {
  getPasswordStrength,
  checkPassMessagePercentage,
  setAuthToken,
} from '../../utils/helperFunctions';
import {COLOR} from '../../utils/colors';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  reducerResponse: object;
  handleSubmit: (values?: {email: string; password: string}) => void;
}

interface state {
  passStrengthMessage: string;
}

class UnConnectedSignUpForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passStrengthMessage: '',
    };
  }

  componentDidMount = () => {};

  handleSignUpSubmit = async (values: {email: string; password: string}) => {
    const {navigation, signUpUser} = this.props;
    const payload = {email: values.email, password: values.password};
    try {
      await signUpUser(payload);
      const {signUpUserResponse} = this.props;
      if (_get(signUpUserResponse, 'response.accessToken', null)) {
        setAuthToken(
          _get(signUpUserResponse, 'response.accessToken', null),
          values.email,
        );
        navigation.navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
      }
    } catch (error) {
      console.log(error);
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
    let passMessagePercentage = checkPassMessagePercentage(
      this.state.passStrengthMessage,
    );
    return (
      <View style={styles.mainContainer}>
        <Header
          title={localeString(LOCALE_STRING.SIGNUP_FORM.SIGNUP_BUTTON)}
          onBackPress={() => this.handleBackPress()}
        />
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
            <View>
              <Field
                name="email"
                label="Email"
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
                component={ReduxFormField}
                props={{
                  maxLength: 16,
                  style: styles.emailInput,
                  secureTextEntry: true,
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
          </View>
        </KeyboardAwareScrollView>
        <Button
          title={localeString(SIGNUP_BUTTON)}
          titleStyle={styles.buttonTextStyle}
          onPress={handleSubmit(this.handleSignUpSubmit)}
          buttonStyle={styles.buttonStyle}
          loading={_get(signUpUserResponse, 'isFetching', false)}
          loadingStyle={styles.loader}
          loadingProps={{size: 28}}
        />
        <Text style={styles.switchToSignUpText}>
          {localeString(LOCALE_STRING.SIGNUP_FORM.ACCOUNT_EXIST)}
          {''}
          <Text onPress={() => this.handleSignInPress()}>
            {' '}
            {localeString(LOCALE_STRING.LOGIN_SCREEN.LOGIN_SIGNIN)}
          </Text>
        </Text>
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
});

const bindActions = dispatch => ({
  signUpUser: payload => dispatch(signUpUser.fetchCall(payload)),
});

export const SignUpForm = connect(
  mapStateToProps,
  bindActions,
)(SignUpScreen);

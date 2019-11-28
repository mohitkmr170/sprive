import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {localeString} from '../../utils/i18n';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {loginUser, getUserInfo} from '../../store/reducers';
import {get as _get} from 'lodash';
import {setAuthToken} from '../../utils/helperFunctions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
  noWhiteSpaces,
} from '../../utils/validate';
import {
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils/constants';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  getUserInfo: () => void;
  getUserInfoResponse: object;
}
interface state {
  passwordVisibility: boolean;
}

class UnConnectedLoginScreen extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passwordVisibility: true,
    };
  }

  handleBackPress = () => {
    /*
    TODO : Handle Back button press, condition based
    */
    this.props.navigation.goBack();
  };

  handleLoginPress = async (values: {email: string; password: string}) => {
    console.log(
      'handleLoginPress : check value entered in Fields, values.email =>',
      values.email,
    );
    const {loginUser, navigation} = this.props;
    const payload = {
      [PAYLOAD_KEYS.LOGIN.STRATEGY]: 'local',
      [PAYLOAD_KEYS.LOGIN.EMAIL]: values.email,
      [PAYLOAD_KEYS.LOGIN.PASSWORD]: values.password,
    };
    await loginUser(payload);
    const {loginUserResponse, getUserInfo} = this.props;
    if (_get(loginUserResponse, DB_KEYS.ACCESS_TOKEN, null)) {
      setAuthToken(
        _get(loginUserResponse, DB_KEYS.ACCESS_TOKEN, null),
        values.email,
      )
        .then(async response => {
          await getUserInfo();
          const {getUserInfoResponse} = this.props;
          if (!_get(getUserInfoResponse, 'error', null))
            navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
        })
        .catch(err => {
          /*
          TODO : Snackbar to be added
          */
          console.error(err);
        });
    }
  };

  handleSignUpPress = () => {
    this.props.navigation.navigate(
      NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN,
    );
  };

  render() {
    const {passwordVisibility} = this.state;
    const {handleSubmit, loginUserResponse} = this.props;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
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
            <Field
              name="email"
              label="Email Address"
              component={ReduxFormField}
              props={{
                keyboardType: 'email-address',
                style: styles.emailInput,
                returnKeyType: 'done',
                autoCapitalize: false,
                placeholder: 'Email',
              }}
              editIcon={true}
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
              }}
              editIcon={true}
              validate={[
                minLength8,
                maxLength16,
                alphaNumeric,
                required,
                noWhiteSpaces,
              ]}
            />
            <TouchableOpacity style={styles.forgotPasswordContainer}>
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
            <Text onPress={() => this.handleSignUpPress()}>
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
});

const bindActions = dispatch => ({
  loginUser: payload => dispatch(loginUser.fetchCall(payload)),
  getUserInfo: payload => dispatch(getUserInfo.fetchCall(payload)), // requires form name
});

export const LoginForm = connect(
  mapStateToProps,
  bindActions,
)(LoginScreen);

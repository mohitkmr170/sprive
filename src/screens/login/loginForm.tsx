import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField} from '../../components';
import {localeString} from '../../utils/i18n';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
} from '../../utils/validate';
import {APP_CONSTANTS} from '../../utils/constants';

const LOGIN_BUTTON = 'login.loginButton';
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
}
interface state {}

class UnConnectedLoginScreen extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  handleBackPress = () => {
    /*
    TODO : Handle Back button press
    */
  };

  handleLoginPress = async (values: {email: string; password: string}) => {
    console.log(
      'handleLoginPress : check value entered in Fields, values.email =>',
      values.email,
    );
  };

  handleSignUpPress = () => {
    /*
    TODO : Navigate to signUpScreen
    */
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header
          title={localeString(LOGIN_BUTTON)}
          onBackPress={() => this.handleBackPress()}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.topContainer}>
          <Text style={styles.signInText}>
            {localeString('login.signInToAccount')}
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
            component={ReduxFormField}
            props={{
              maxLength: 16,
              style: styles.emailInput,
              secureTextEntry: true,
              autoCapitalize: false,
              placeholder: 'Password',
            }}
            editIcon={true}
            validate={[minLength8, maxLength16, alphaNumeric, required]}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>
              {localeString('login.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <Button
          title={localeString(LOGIN_BUTTON)}
          titleStyle={styles.buttonTitleStyle}
          onPress={handleSubmit(this.handleLoginPress)}
          buttonStyle={styles.buttonExtStyle}
        />
        <Text style={styles.switchToSignUpText}>
          {localeString('login.dontHaveAccount')}{' '}
          <Text onPress={() => this.handleSignUpPress()}>
            {localeString('signUp.singUpButton')}
          </Text>
        </Text>
      </View>
    );
  }
}
export const LoginScreen = reduxForm({
  form: APP_CONSTANTS.LOGIN_FORM,
})(UnConnectedLoginScreen);

const mapStateToProps = state => ({});

const bindActions = () => ({});

export const LoginForm = connect(
  mapStateToProps,
  bindActions,
)(LoginScreen);

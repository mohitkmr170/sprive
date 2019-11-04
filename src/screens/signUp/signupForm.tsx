import React from 'react';
import {View, TextInput, Alert, Text, ScrollView} from 'react-native';
import * as Progress from 'react-native-progress';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField} from '../../components';
import {localeString} from '../../utils/i18n';
import {Field, reduxForm} from 'redux-form';
import {
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
} from '../../utils/validate';
import {APP_CONSTANTS} from '../../utils/constants';
import {getPasswordStrength} from '../../utils/helperFuntions';

const SIGNUP_BUTTON = 'signUp.singUpButton';
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
}

interface state {
  password: string;
  passStrengthMessage: string;
  email: string;
}

class UnConnectedSignUpForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passStrengthMessage: '',
    };
  }

  UNSAFE_componentWillMount = () => {};

  handleSignUpSubmit = async (values: {email: string; password: string}) => {
    const {navigation} = this.props;
    Alert.alert('Check!');
  };

  /**
   *
   * @param password : string : password to get strength
   */
  handlePassword(password: string) {
    getPasswordStrength(password)
      .then(res => {
        console.log('handlePassword : res =>', res);
        this.setState({passStrengthMessage: res});
      })
      .catch(err => console.log(err));
    this.setState({password});
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
  };

  /**
   * Funtion to calculate percent for pasword strength status bar
   */

  checkPassMessagePercentage = () => {
    let passPercent = 0;
    switch (this.state.passStrengthMessage) {
      case 'Too Short':
        passPercent = 0.25;
        break;
      case 'Fair':
        passPercent = 0.5;
        break;
      case 'Good':
        passPercent = 0.75;
        break;
      case 'Strong':
        passPercent = 1;
        break;
      default:
        passPercent = 0;
    }
    return passPercent;
  };

  render() {
    const {handleSubmit} = this.props;
    let passMessagePercentage = this.checkPassMessagePercentage();
    return (
      <View style={styles.mainContainer}>
        <Header
          title={localeString(SIGNUP_BUTTON)}
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.topContainer}>
          <Field
            name="email"
            component={ReduxFormField}
            props={{
              keyboardType: 'email-address',
              style: styles.emailInput,
              returnKeyType: 'done',
              autoCapitalize: false,
              placeholder: 'Email',
              onChangeText: (email: any) => this.setState({email}),
            }}
            validate={[email, required]}
          />
          <Field
            name="password"
            component={ReduxFormField}
            props={{
              maxLength: 16,
              style: styles.emailInput,
              secureTextEntry: true,
              autoCapitalize: false,
              placeholder: 'Password',
              onChangeText: (password: string) => this.handlePassword(password),
            }}
            validate={[minLength8, maxLength16, alphaNumeric, required]}
          />
          {this.state.password.length >= 2 && (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Progress.Bar progress={passMessagePercentage} color="green" />
              </View>
              <Text>{this.state.passStrengthMessage}</Text>
            </View>
          )}
        </View>
        <Button
          title={localeString(SIGNUP_BUTTON)}
          onPress={handleSubmit(this.handleSignUpSubmit)}
        />
      </View>
    );
  }
}

export const SignUpForm = reduxForm({
  form: APP_CONSTANTS.SIGNUP_FORM,
})(UnConnectedSignUpForm);

import React from 'react';
import {View, TextInput, Alert} from 'react-native';
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

const SIGNUP_BUTTON = 'signUp.singUpButton';
interface props {
  navigation: any;
  handleSubmit: (values: any) => any;
}

interface state {}

class UnConnectedSignUpForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      configPassword: '',
    };
  }

  handleSignUpSubmit = async (values: any) => {
    const {navigation} = this.props;
    console.log('handleSubmit values', values.phoneNumber);
    await Alert.alert('Check!');
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header
          title={localeString(SIGNUP_BUTTON)}
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.topContainer}>
          <Field
            name="phoneNumber"
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
              onChangeText: (password: any) => this.setState({password}),
            }}
            validate={[minLength8, maxLength16, alphaNumeric, required]}
          />
          <Field
            name="Confirm password"
            component={ReduxFormField}
            props={{
              maxLength: 16,
              style: styles.emailInput,
              secureTextEntry: true,
              autoCapitalize: false,
              placeholder: 'Confirm Password',
              onChangeText: (configPassword: any) =>
                this.setState({configPassword}),
            }}
            validate={[minLength8, maxLength16, alphaNumeric, required]}
          />
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
  form: 'signup',
})(UnConnectedSignUpForm);

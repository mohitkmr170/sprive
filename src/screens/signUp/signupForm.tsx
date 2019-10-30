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
import {appConstants} from '../../utils/constants';

const SIGNUP_BUTTON = 'signUp.singUpButton';
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
}

interface state {}

class UnConnectedSignUpForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSignUpSubmit = async (values?: {
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    const {navigation} = this.props;
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
              onChangeText: (password: any) => this.setState({password}),
            }}
            validate={[minLength8, maxLength16, alphaNumeric, required]}
          />
          <Field
            name="Confirm_password"
            component={ReduxFormField}
            props={{
              maxLength: 16,
              style: styles.emailInput,
              secureTextEntry: true,
              autoCapitalize: false,
              placeholder: 'Confirm Password',
              onChangeText: (confirmPassword: string) =>
                this.setState({confirmPassword}),
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
  form: appConstants.SIGNUP_FORM,
})(UnConnectedSignUpForm);

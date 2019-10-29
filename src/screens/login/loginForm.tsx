import React from 'react';
import {View, Text, TextInput} from 'react-native';
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

const LOGIN_BUTTON = 'login.loginButton';
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values: any) => any;
}
interface state {}

class UnConnectedLoginForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  async UNSAFE_componentWillMount() {}

  handleLoginPress = async (values: any) => {
    const {navigation} = this.props;
    console.log('handleSubmit values', values.phoneNumber);
    await navigation.navigate('SignUpScreen');
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header title={localeString(LOGIN_BUTTON)} onBackPress={() => {}} />
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
        </View>
        <Button
          title={localeString(LOGIN_BUTTON)}
          onPress={handleSubmit(this.handleLoginPress)}
        />
      </View>
    );
  }
}

export const LoginForm = reduxForm({
  form: 'logIn',
})(UnConnectedLoginForm);

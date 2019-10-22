import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField} from '../../components';
import {strings} from '../../utils/i18n';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {addUserDetails} from '../../store/actions/actions';
import {
  email,
  minLength8,
  maxLength16,
  required,
  alphaNumeric,
} from '../../utils/validate';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  handleSubmit: (values: any) => any;
}
interface state {}

class UnConnectedLoginScreen extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  async UNSAFE_componentWillMount() {}

  handleLoginPress = async (values: any) => {
    const {navigation, addUserDetails} = this.props;
    console.log('handleSubmit values', values.phoneNumber);
    let payload = {
      userName: this.state.email,
      userPassword: this.state.password,
    };
    await addUserDetails(payload);
    const {addUserDetailsResponse} = this.props;
    console.log('addUserDetailsResponse', addUserDetailsResponse);
    await navigation.navigate('SignUpScreen');
  };

  render() {
    const {handleSubmit, addUserDetailsResponse} = this.props;
    console.log('kajbsdasd111111', addUserDetailsResponse);
    return (
      <View style={styles.mainContainer}>
        <Header title={strings('login.loginButton')} onBackPress={() => {}} />
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
          title={strings('login.loginButton')}
          onPress={handleSubmit(this.handleLoginPress)}
        />
      </View>
    );
  }
}

export const LoginScreen = reduxForm({
  form: 'logIn',
})(UnConnectedLoginScreen);

const mapStateToProps = state => ({
  addUserDetailsResponse: state.applicationReducer,
});

const bindActions = dispatch => ({
  addUserDetails: payload => dispatch(addUserDetails(payload)),
});

export const LoginForm = connect(
  mapStateToProps,
  bindActions,
)(LoginScreen);

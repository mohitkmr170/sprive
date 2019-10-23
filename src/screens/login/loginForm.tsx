import React from 'react';
import {View, Text, TextInput, Platform, Linking, Alert} from 'react-native';
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

  static navigationOption = {
    title: 'UnConnectedLoginScreen',
  };

  navigate = (url: any) => {
    const {navigate} = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];
    console.log('asjdghabsdas', route, routeName);
    if (routeName === 'home') {
      navigate('DashBoardScreen');
    }
  };

  handleOpenURL = (event: any) => {
    this.navigate(event.url);
  };

  async UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url: any) => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

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

  handleEmailCheck = () => {
    Linking.openURL('spriveapp://home');
  };

  render() {
    const {handleSubmit, addUserDetailsResponse} = this.props;
    console.log('kajbsdasd111111', addUserDetailsResponse);
    return (
      <View style={styles.mainContainer}>
        <Header
          title={strings('login.loginButton')}
          onBackPress={() => Linking.openURL('Maps://app')}
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
        </View>
        <Button
          title="Check your email"
          onPress={() => this.handleEmailCheck()}
          style={{
            width: '40%',
            alignSelf: 'center',
            margin: 24,
          }}
        />
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

import React from 'react';
import {View, Text, TextInput, Platform, Linking, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header, ReduxFormField} from '../../components';
import {localeString} from '../../utils/i18n';
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
import {
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
} from '../../utils/constants';

const LOGIN_BUTTON = 'login.loginButton';
const HOME_ROUTE = 'home';
const CHECK_EMAIL = 'check_your_email'; //seperate file with all keys to be made leter
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  addUserDetails: object;
  addUserDetailsResponse: object;
  handleSubmit: (values?: {email: string; password: string}) => void;
}
interface state {
  email: string;
  password: string;
}

class UnConnectedLoginScreen extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  /*
  TODO : Deeplinking code to be moved into separate file later
  */

  static navigationOption = {
    title: 'UnConnectedLoginScreen',
  };

  navigate = (url: any) => {
    const {navigate} = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];
    console.log(
      'UnConnectedLoginScreen : navigate : extracting routeName for next condition : route, routeName =>',
      route,
      routeName,
    );
    if (routeName === HOME_ROUTE) {
      navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
    }
  };

  /**
   *
   * @param event : any : For Deeplink - URL
   */
  handleOpenURL(event: any) {
    this.navigate(event.url);
  }

  async UNSAFE_componentWillMount() {
    if (Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_ANDROID) {
      Linking.getInitialURL()
        .then((url: any) => {
          this.navigate(url);
        })
        .catch(err => {
          //error to be handled as per use case
          console.log('UNSAFE_componentWillMount : error catch, err =>', err);
        });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    // Remove Deeplink event listener upon Unmount
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleLoginPress = async (values: {email: string; password: string}) => {
    const {navigation, addUserDetails} = this.props;
    console.log(
      'handleLoginPress : check value entered in Fields, values.email =>',
      values.email,
    );
    let payload = {
      userName: this.state.email,
      userPassword: this.state.password,
    };
    try {
      await addUserDetails(payload);
      const {addUserDetailsResponse} = this.props;
      console.log(
        'handleLoginPress : check the userDetails fetched from store, addUserDetailsResponse =>',
        addUserDetailsResponse,
      );
    } catch (err) {
      //error to be handled as per use case
      console.log(err);
    }
    navigation.navigate(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
  };

  // Redirecting to external app
  handleEmailCheck = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header title={localeString(LOGIN_BUTTON)} onBackPress={() => {}} />
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
              onChangeText: (email: string) => this.setState({email}),
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
              onChangeText: (password: string) => this.setState({password}),
            }}
            validate={[minLength8, maxLength16, alphaNumeric, required]}
          />
        </View>
        <Button
          title="Home"
          onPress={() =>
            this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.APP_STACK)
          }
          style={styles.buttonStyle}
        />
        <Button
          title={localeString(CHECK_EMAIL)}
          onPress={() => this.handleEmailCheck()}
          style={styles.buttonStyle}
        />
        <Button
          title={localeString(LOGIN_BUTTON)}
          onPress={handleSubmit(this.handleLoginPress)}
        />
      </View>
    );
  }
}
export const LoginScreen = reduxForm({
  form: APP_CONSTANTS.LOGIN_FORM,
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

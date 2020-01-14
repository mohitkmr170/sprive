import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header, ReduxFormField} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {
  NAVIGATION_SCREEN_NAME,
  APP_CONSTANTS,
  LOCALE_STRING,
} from '../../utils/constants';
import {get as _get} from 'lodash';
import {email, required} from '../../utils/validate';
import {localeString} from '../../utils/i18n';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
}
interface state {}

export class UnconnectedForgotPassword extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  handleLinkSent = async (values: {email: string; password: string}) => {
    console.log('handleLinkSent : values : =>', values);
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.FORGOT_PASSWORD_MAIL);
  };
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  async componentDidMount() {}
  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handleBackPress()} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.middleContainer}>
            <Text style={styles.forgotPassText}>Forgot Password</Text>
            <View style={styles.mainView}>
              <Field
                name={localeString(LOCALE_STRING.FORGOT_PASSWORD.SMALL_EMAIL)}
                label={localeString(LOCALE_STRING.FORGOT_PASSWORD.ENTER_EMAIL)}
                component={ReduxFormField}
                props={{
                  keyboardType: 'email-address',
                  style: styles.emailInput,
                  autoCapitalize: false,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  placeholder: localeString(
                    LOCALE_STRING.FORGOT_PASSWORD.LARGE_EMAIL,
                  ),
                }}
                editIcon={true}
                onSubmitEditing={handleSubmit(this.handleLinkSent)}
                // onFocus={() => this.hideServerError()}
                validate={[email, required]}
              />
            </View>
          </View>
          <View>
            <Button
              title={localeString(LOCALE_STRING.FORGOT_PASSWORD.SEND_LINK)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleLinkSent)}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
export const ForgotPasswordForm = reduxForm({
  form: APP_CONSTANTS.FORGOT_PASSWORD_FORM,
})(UnconnectedForgotPassword);
const mapStateToProps = state => ({});

const bindActions = dispatch => ({});

export const ForgotPassword = connect(
  mapStateToProps,
  bindActions,
)(ForgotPasswordForm);

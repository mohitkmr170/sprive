import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header, ReduxFormField} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {resetPasswordLink, getUserInfo} from '../../store/reducers';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {
  NAVIGATION_SCREEN_NAME,
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
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
  getUserInfo: () => void;
  resetPasswordLink: (payload: object) => void;
  getUserInfoResponse: object;
  resetPasswordLinkResponse: object;
  reducerResponse: object;
}
interface state {}

export class UnconnectedForgotPassword extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  handleLinkSent = async (values: {email: string; password: string}) => {
    console.log('handleLinkSent : values : =>', values);
    const {resetPasswordLink} = this.props;
    const payload = {
      email: _get(values, APP_CONSTANTS.ERROR_STATE_VALUES.EMAIL, ''),
    };
    await resetPasswordLink(payload);
    const {resetPasswordLinkResponse} = this.props;
    if (!_get(resetPasswordLinkResponse, DB_KEYS.ERROR, true))
      this.props.navigation.navigate(
        NAVIGATION_SCREEN_NAME.FORGOT_PASSWORD_MAIL,
      );
  };
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  async componentDidMount() {}
  render() {
    const {handleSubmit, resetPasswordLinkResponse} = this.props;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handleBackPress()} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.middleContainer}>
            <Text style={styles.forgotPassText}>
              {localeString(LOCALE_STRING.FORGOT_PASSWORD.FORGOT_PASSWORD)}
            </Text>
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
              loading={_get(
                resetPasswordLinkResponse,
                DB_KEYS.IS_FETCHING,
                false,
              )}
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
const mapStateToProps = state => ({
  initialValues: {
    email: _get(state, DB_KEYS.LOGIN_EMAIL, ''),
  },
  reducerResponse: state.form,
  getUserInfoResponse: state.getUserInfo,
  resetPasswordLinkResponse: state.resetPasswordLink,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  resetPasswordLink: payload => dispatch(resetPasswordLink.fetchCall(payload)),
});

export const ForgotPassword = connect(
  mapStateToProps,
  bindActions,
)(ForgotPasswordForm);

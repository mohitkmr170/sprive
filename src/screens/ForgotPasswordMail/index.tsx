import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {localeString} from '../../utils/i18n';
import {APP_CONSTANTS, LOCALE_STRING, DB_KEYS} from '../../utils/constants';
import {resetPasswordLink} from '../../store/reducers';
import {openInbox} from 'react-native-email-link';
import {get as _get} from 'lodash';
import {showSnackBar} from '../../utils/helperFunctions';
interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  reducerResponse: object;
  resetPasswordLink: (payload: object) => void;
  resetPasswordLinkResponse: object;
}
interface state {}

export class UnconnectedPasswordCheckMail extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  handleOpenEmailApp = () => {
    openInbox({
      title: localeString(LOCALE_STRING.SIGNUP_FORM.EMAIL_CLIENTS),
    });
  };
  handleResendPasswordLink = async () => {
    const {resetPasswordLink, reducerResponse} = this.props;
    const payload = {
      email: _get(reducerResponse, DB_KEYS.FORGOT_PASSWORD_EMAIL, ''),
    };
    await resetPasswordLink(payload);
    const {resetPasswordLinkResponse} = this.props;
    if (!_get(resetPasswordLinkResponse, DB_KEYS.ERROR, true)) {
      showSnackBar(
        {},
        localeString(LOCALE_STRING.FORGOT_PASSWORD.MAGIN_LINK_SENT_AGAIN),
      );
    }
  };
  render() {
    const {reducerResponse, resetPasswordLinkResponse} = this.props;
    const currentUserMail = _get(
      reducerResponse,
      DB_KEYS.FORGOT_PASSWORD_EMAIL,
      '',
    );
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handleBackPress()} />
        <View style={styles.middleContainer}>
          <Text style={styles.forgotPassText}>
            {localeString(LOCALE_STRING.FORGOT_PASSWORD.FORGOT_PASSWORD)}
          </Text>
          <Text style={styles.pleaseCheckText}>
            {localeString(LOCALE_STRING.FORGOT_PASSWORD.MAGIN_LINK_FIRST_PART)}
            <Text style={styles.currEmailText}>{currentUserMail}</Text>
            {localeString(LOCALE_STRING.FORGOT_PASSWORD.MAGIN_LINK_SECOND_PART)}
          </Text>
        </View>
        <View>
          <Button
            title={localeString(
              LOCALE_STRING.EMAIL_VERIFICATION.OPEN_EMAIL_APP,
            )}
            titleStyle={styles.buttonTextStyle}
            onPress={() => this.handleOpenEmailApp()}
            buttonStyle={styles.buttonStyle}
            loading={_get(
              resetPasswordLinkResponse,
              DB_KEYS.IS_FETCHING,
              false,
            )}
          />
          <TouchableOpacity
            style={styles.resendTouchContainer}
            hitSlop={APP_CONSTANTS.HIT_SLOP}
            onPress={() => this.handleResendPasswordLink()}>
            <Text style={styles.resentText}>
              {localeString(LOCALE_STRING.FORGOT_PASSWORD.NO_MAIL_RECEIVED)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  reducerResponse: state.form,
  resetPasswordLinkResponse: state.resetPasswordLink,
});

const bindActions = dispatch => ({
  resetPasswordLink: payload => dispatch(resetPasswordLink.fetchCall(payload)),
});

export const PasswordCheckMail = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedPasswordCheckMail);

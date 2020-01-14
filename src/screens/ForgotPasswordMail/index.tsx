import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {localeString} from '../../utils/i18n';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
} from '../../utils/constants';
import {openInbox} from 'react-native-email-link';
import {get as _get} from 'lodash';
interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  reducerResponse: object;
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
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.RESET_PASSWORD);
  };
  render() {
    const {reducerResponse} = this.props;
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
            {localeString(LOCALE_STRING.FORGOT_PASSWORD.MAGIN_LINK_FIRST_PART) +
              currentUserMail +
              localeString(
                LOCALE_STRING.FORGOT_PASSWORD.MAGIN_LINK_SECOND_PART,
              )}
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
});

const bindActions = dispatch => ({});

export const PasswordCheckMail = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedPasswordCheckMail);

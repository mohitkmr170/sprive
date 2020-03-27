import React from 'react';
import {View, Text, Image, BackHandler, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {accountLocked} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  localeString,
  STYLE_CONSTANTS,
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils';
import {get as _get} from 'lodash';

const CONTACT_ADMIN_SUPPORT = {
  SUPPORT_MAIL_ID: 'support@sprive.com',
  SUBJECT: 'Account Locked!',
  BODY: 'Some Phrase',
};

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
}
interface state {}

export class UnconnectedAccountBlocked extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    BackHandler.addEventListener(
      APP_CONSTANTS.HARD_BACK_PRESS,
      this.handleBackButton,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      APP_CONSTANTS.HARD_BACK_PRESS,
      this.handleBackButton,
    );
  }

  handleBackButton() {
    console.log('handleBackButton : Back button is pressed');
    return true;
  }
  handleContactAdmin = () => {
    Linking.openURL(
      `mailto:${CONTACT_ADMIN_SUPPORT.SUPPORT_MAIL_ID}?subject=${CONTACT_ADMIN_SUPPORT.SUBJECT}&body=${CONTACT_ADMIN_SUPPORT.BODY}`,
    );
  };
  getAccountBlockedReason = (blockedType: string) => {
    switch (blockedType) {
      case DB_KEYS.RESET_PASSWORD.PASSWORD_RESET:
        return localeString(LOCALE_STRING.ACCOUNT_LOCKED.CASE_RESET_PASSWORD);
      case DB_KEYS.RESET_PASSWORD.MALICIOUS_ATTEMPT:
        return localeString(LOCALE_STRING.ACCOUNT_LOCKED.MALICIOUS_ATTEMPT);
      case DB_KEYS.RESET_PASSWORD.VERIFICATION_FAIL:
        return localeString(LOCALE_STRING.ACCOUNT_LOCKED.CASE_VERIFICATION);
      default:
        return localeString(LOCALE_STRING.ACCOUNT_LOCKED.GENERAL);
    }
  };
  render() {
    const blockedType = _get(
      this.props,
      DB_KEYS.RESET_PASSWORD.BLOCKED_TYPE,
      '',
    );
    let blockedReasonText = this.getAccountBlockedReason(blockedType);
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => {}} />
        <View style={styles.middleContainer}>
          <Image
            source={accountLocked}
            style={styles.imageView}
            resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
          />
          <View style={styles.textContainer}>
            <Text style={styles.pleaseCheckText}>
              {localeString(LOCALE_STRING.ACCOUNT_LOCKED.ACCOUNT_LOCKED)}
            </Text>
            <Text style={styles.emailSentText}>{blockedReasonText}</Text>
          </View>
        </View>
        <View>
          <Button
            title={localeString(LOCALE_STRING.ACCOUNT_LOCKED.CONTACT_ADMIN)}
            titleStyle={styles.buttonTextStyle}
            onPress={() => this.handleContactAdmin()}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

const bindActions = dispatch => ({});

export const AccountBlocked = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedAccountBlocked);

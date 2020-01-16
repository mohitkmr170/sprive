import React from 'react';
import {View, Text, Image, BackHandler, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {accountLocked} from '../../assets';
import {localeString} from '../../utils/i18n';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  STYLE_CONSTANTS,
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils/constants';
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
interface state {
  isBlockedFromPasswordReset: boolean;
}

export class UnconnectedAccountBlocked extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isBlockedFromPasswordReset: false,
    };
  }

  async componentDidMount() {
    const blockedType = _get(
      this.props,
      DB_KEYS.RESET_PASSWORD.BLOCKED_TYPE,
      '',
    );
    if (blockedType === DB_KEYS.RESET_PASSWORD.PASSWORD_RESET) {
      this.setState({isBlockedFromPasswordReset: true});
    }
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
  render() {
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
            <Text style={styles.emailSentText}>
              {this.state.isBlockedFromPasswordReset
                ? localeString(LOCALE_STRING.ACCOUNT_LOCKED.CASE_RESET_PASSWORD)
                : localeString(LOCALE_STRING.ACCOUNT_LOCKED.CASE_VERIFICATION)}
            </Text>
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

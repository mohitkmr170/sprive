import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {emaiSent} from '../../assets';
import {styles} from './styles';
import {localeString} from '../../utils/i18n';
import {APP_CONSTANTS, LOCALE_STRING} from '../../utils/constants';
import {openInbox} from 'react-native-email-link';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
}
interface state {
  isEmailResent: boolean;
}

export class CheckEmail extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isEmailResent: false,
    };
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  handleOpenEmailApp = () => {
    // Linking.openURL('mailto:');
    openInbox({
      title: 'asdas',
    });
  };
  handleResendVerification = () => {
    this.setState({
      isEmailResent: true,
    });
  };
  render() {
    const {isEmailResent} = this.state;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handleBackPress()} />
        <View style={styles.middleContainer}>
          <Image
            source={emaiSent}
            style={styles.imageView}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.pleaseCheckText}>
              {isEmailResent
                ? localeString(
                    LOCALE_STRING.EMAIL_VERIFICATION.EMAIL_SENT_AGAIN,
                  )
                : localeString(LOCALE_STRING.EMAIL_VERIFICATION.CHECK_EMAIL)}
            </Text>
            <Text style={styles.emailSentText}>
              {localeString(LOCALE_STRING.EMAIL_VERIFICATION.EMAIL_SENT)}
            </Text>
          </View>
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
            onPress={() => this.handleResendVerification()}>
            <Text style={styles.resentText}>
              {localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.RESEND_VERIFICATION,
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

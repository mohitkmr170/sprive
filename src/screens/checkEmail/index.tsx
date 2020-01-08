import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {emaiSent} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  verifyEmail,
  setUserMortgage,
  getUserInfo,
  resendEmail,
} from '../../store/reducers';
import {localeString} from '../../utils/i18n';
import {APP_CONSTANTS, LOCALE_STRING} from '../../utils/constants';
import {openInbox} from 'react-native-email-link';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  verifyEmail: (payload: object) => void;
  verifyEmailResponse: object;
  resendEmail: (payload: object) => void;
  resendEmailResponse: object;
  setUserMortgage: (payload: object) => void;
  setUserMortgageResponse: object;
  getUserInfo: () => void;
  getUserInfoResponse: object;
  reducerResponse: object;
}
interface state {
  isEmailResent: boolean;
  loading: boolean;
  isVerifyApicalled: boolean;
}

export class UnconnectedCheckEmail extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isEmailResent: false,
      loading: false,
      isVerifyApicalled: false,
    };
  }

  async componentDidMount() {
    const {getUserInfo} = this.props;
    await getUserInfo();
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  handleOpenEmailApp = () => {
    openInbox({
      title: 'Email Clients found on your device',
    });
  };
  handleResendVerification = async () => {
    const {resendEmail, getUserInfoResponse} = this.props;
    const payload = {
      email: _get(getUserInfoResponse, 'response.data.email', null),
    };
    await resendEmail(payload);
    this.setState({
      isEmailResent: true,
    });
  };
  render() {
    const {isEmailResent} = this.state;
    const {verifyEmailResponse, getUserInfoResponse} = this.props;
    let isVerified = _get(verifyEmailResponse, 'error', false);
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
              {localeString(LOCALE_STRING.EMAIL_VERIFICATION.EMAIL_SENT, {
                currentEmail: _get(
                  getUserInfoResponse,
                  'response.data.email',
                  null,
                ),
              })}
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
            loading={
              _get(verifyEmailResponse, 'isFetching', '') ||
              _get(resendEmailResponse, 'isFetching', '')
            }
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
const mapStateToProps = state => ({
  verifyEmailResponse: state.verifyEmail,
  resendEmailResponse: state.resendEmail,
  reducerResponse: state.form,
  setUserMortgageResponse: state.setUserMortgage,
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({
  verifyEmail: payload => dispatch(verifyEmail.fetchCall(payload)),
  resendEmail: payload => dispatch(resendEmail.fetchCall(payload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  setUserMortgage: payload => dispatch(setUserMortgage.fetchCall(payload)),
});

export const CheckEmail = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedCheckEmail);

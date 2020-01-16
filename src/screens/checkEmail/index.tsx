import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header} from '../../components';
import {emailSent} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  verifyEmail,
  setUserMortgage,
  getUserInfo,
  resendEmail,
} from '../../store/reducers';
import {localeString} from '../../utils/i18n';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
  STYLE_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
} from '../../utils/constants';
import {openInbox} from 'react-native-email-link';
import {get as _get} from 'lodash';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

const INTENT_BUTTON_RESET_TIME = 1000;
interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
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
  isEmailButtonClicked: boolean;
}

export class UnconnectedCheckEmail extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isEmailResent: false,
      loading: false,
      isEmailButtonClicked: false,
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
      title: localeString(LOCALE_STRING.SIGNUP_FORM.EMAIL_CLIENTS),
    });
  };
  handleResendVerification = async () => {
    const {resendEmail, getUserInfoResponse} = this.props;
    const payload = {
      [PAYLOAD_KEYS.SIGNUP.EMAIL]: _get(
        getUserInfoResponse,
        DB_KEYS.CURRENT_USER_EMAIL,
        null,
      ),
    };
    await resendEmail(payload);
    const {resendEmailResponse} = this.props;
    _get(resendEmailResponse, DB_KEYS.USER_INFO_RESPONSE_IS_BLOCKED, false)
      ? this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.ACCOUNT_BLOCKED)
      : this.setState({
          isEmailResent: true,
        });
  };
  render() {
    const {isEmailResent, isEmailButtonClicked} = this.state;
    const {
      verifyEmailResponse,
      getUserInfoResponse,
      resendEmailResponse,
    } = this.props;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handleBackPress()} />
        <View style={styles.middleContainer}>
          <Image
            source={emailSent}
            style={styles.imageView}
            resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
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
                  DB_KEYS.CURRENT_USER_EMAIL,
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
            onPress={() => {
              this.setState({isEmailButtonClicked: true}, () => {
                this.handleOpenEmailApp();
              });
              setTimeout(() => {
                this.setState({isEmailButtonClicked: false});
              }, INTENT_BUTTON_RESET_TIME);
            }}
            buttonStyle={styles.buttonStyle}
            loading={
              isEmailButtonClicked ||
              _get(verifyEmailResponse, DB_KEYS.IS_FETCHING, '') ||
              _get(resendEmailResponse, DB_KEYS.IS_FETCHING, '')
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

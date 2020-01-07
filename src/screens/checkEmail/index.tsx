import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header, StatusOverlay} from '../../components';
import {emaiSent, iVerify} from '../../assets';
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
  NAVIGATION_SCREEN_NAME,
} from '../../utils/constants';
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
  completeVerification = async () => {
    const {
      navigation,
      getUserInfo,
      reducerResponse,
      setUserMortgage,
    } = this.props;
    // getUserInfo API call
    await getUserInfo();
    const {getUserInfoResponse} = this.props;
    if (_get(getUserInfoResponse, DB_KEYS.ERROR, null)) {
      this.setState({isVerifyApicalled: true});
      // navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    } else {
      const mortgageData = {
        mortgage_balance: _get(
          reducerResponse,
          DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT,
          '',
        ).replace(/,/g, ''),
        mortgage_term: _get(
          reducerResponse,
          DB_KEYS.FORM_MORTGAGE_TIMEPERIOD,
          '',
        ).replace(/,/g, ''),
        mortgage_payment: _get(
          reducerResponse,
          DB_KEYS.FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT,
          '',
        ).replace(/,/g, ''),
        user_id: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
      };
      await setUserMortgage(mortgageData);
      const {setUserMortgageResponse} = this.props;
      if (_get(setUserMortgageResponse, DB_KEYS.RESPONSE_DATA, null)) {
        this.setState({isVerifyApicalled: true});
        // navigation.navigate(NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN);
      }
      //   // await resetAuthToken();
      //   navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
      // }
    }
  };
  async componentDidMount() {
    let verificationToken = _get(this.props.navigation, 'state.params', null);
    console.log('componentDidMount : verificationToken ==>', verificationToken);
    if (verificationToken) {
      const {verifyEmail} = this.props;
      this.setState({loading: true});
      const payload = {
        verification_token: verificationToken,
      };
      await verifyEmail(payload);
      const {verifyEmailResponse} = this.props;
      if (_get(verifyEmailResponse, 'response.status', false)) {
        console.log(
          'componentDidMount : verifyEmailResponse ==>',
          verifyEmailResponse,
        );
        this.completeVerification();
      } else {
        this.setState({isVerifyApicalled: true});
      }
    }
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
  handleResendVerification = async () => {
    const {reducerResponse, resendEmail} = this.props;
    const payload = {
      email: _get(reducerResponse, 'signup.values.email', ''),
    };
    await resendEmail(payload);
    const {resendEmailResponse} = this.props;
    this.setState({
      isEmailResent: true,
    });
  };
  render() {
    const {isEmailResent, loading, isVerifyApicalled} = this.state;
    const {verifyEmailResponse, navigation, resendEmailResponse} = this.props;
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
        {isVerifyApicalled && !isVerified && (
          <StatusOverlay
            icon={iVerify}
            firstButtonText="Okay"
            handleFirstButton={() =>
              navigation.navigate(NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN)
            }
            mainMessage="Success! Account Verified"
            infoTitle="Please create a secure PIN for the account"
          />
        )}
        {isVerified && isVerifyApicalled && (
          <StatusOverlay
            icon={iVerify}
            firstButtonText="Okay"
            handleFirstButton={() => this.setState({isVerifyApicalled: false})}
            mainMessage="Account verification failed"
            infoTitle="Please"
          />
        )}
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

import React from 'react';
import {View} from 'react-native';
import {
  GeneralStatusBar,
  Header,
  StatusOverlay,
  LoadingModal,
} from '../../components';
import {
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
} from '../../utils/constants';
import {get as _get} from 'lodash';
import {iVerify} from '../../assets';
import {connect} from 'react-redux';
import {
  verifyEmail,
  setUserMortgage,
  getUserInfo,
  resendEmail,
} from '../../store/reducers';
import {getAuthToken} from '../../utils/helperFunctions';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';
import {localeString} from '../../utils/i18n';

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
  isVerifyApicalled: boolean;
}
export class UnconnectedDeepLinkLanding extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isVerifyApicalled: false,
    };
  }
  completeVerification = async () => {
    const {getUserInfo, reducerResponse, setUserMortgage} = this.props;
    // getUserInfo API call
    await getUserInfo();
    const {getUserInfoResponse} = this.props;
    if (_get(getUserInfoResponse, DB_KEYS.ERROR, null)) {
      this.setState({isVerifyApicalled: true});
      // navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    } else {
      const mortgageData = {
        [PAYLOAD_KEYS.MORTGAGE_INPUT.MORTGAGE_BALANCE]: _get(
          reducerResponse,
          DB_KEYS.FORM_MORTGAGE_MORTGAGE_AMOUNT,
          '',
        ).replace(/,/g, ''),
        [PAYLOAD_KEYS.MORTGAGE_INPUT.MORTGAGE_TERM]: _get(
          reducerResponse,
          DB_KEYS.FORM_MORTGAGE_TIMEPERIOD,
          '',
        ).replace(/,/g, ''),
        [PAYLOAD_KEYS.MORTGAGE_INPUT.MORTGAGE_PAYMENT]: _get(
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
      }
      //   // await resetAuthToken();
      //   navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
      // }
    }
  };
  async componentDidMount() {
    const {getUserInfo} = this.props;
    await getUserInfo();
    let verificationToken = _get(
      this.props.navigation,
      DB_KEYS.NAVIGATION_PARAMS,
      null,
    ).deepLinkToken;
    console.log('componentDidMount : verificationToken ==>', verificationToken);
    if (verificationToken) {
      const {verifyEmail} = this.props;
      const payload = {
        [PAYLOAD_KEYS.SIGNUP.VERIFICATION_TOKEN]: verificationToken,
      };
      await verifyEmail(payload);
      const {verifyEmailResponse} = this.props;
      if (!_get(verifyEmailResponse, DB_KEYS.ERROR, false)) {
        console.log(
          'componentDidMount : verifyEmailResponse ==>',
          verifyEmailResponse,
        );
        this.completeVerification();
      } else {
        this.setState({isVerifyApicalled: true});
        getAuthToken()
          .then(res => {
            if (res === 'FALSE TOKEN') {
              this.props.navigation.navigate(
                NAVIGATION_SCREEN_NAME.LOGIN_SCREEN,
              );
            } else {
              this.props.navigation.navigate(
                NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
              );
            }
          })
          .catch(() => {});
      }
    }
  }
  render() {
    const {isVerifyApicalled} = this.state;
    const {verifyEmailResponse, navigation} = this.props;
    let isVerified = _get(verifyEmailResponse, DB_KEYS.ERROR, false);
    if (!isVerifyApicalled) return <LoadingModal loadingText="Verifying..." />;
    else
      return (
        <View style={{flex: 1}}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            onBackPress={() => {}}
            title={localeString(LOCALE_STRING.EMAIL_VERIFICATION.VERIFICATION)}
          />
          {isVerifyApicalled && !isVerified && (
            <StatusOverlay
              icon={iVerify}
              firstButtonText={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.OKAY,
              )}
              handleFirstButton={() =>
                navigation.navigate(NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN)
              }
              mainMessage={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.SUCCESS_TITLE,
              )}
              infoTitle={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.SUCCESS_MESSAGE,
              )}
            />
          )}
          {isVerified && isVerifyApicalled && (
            <StatusOverlay
              icon={iVerify}
              firstButtonText={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.OKAY,
              )}
              handleFirstButton={() =>
                this.setState({isVerifyApicalled: false})
              }
              mainMessage={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.FAIL_TITLE,
              )}
              infoTitle={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.FAIL_MESSAGE,
              )}
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

export const DeepLinkLanding = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDeepLinkLanding);

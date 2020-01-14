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
  APP_CONSTANTS,
} from '../../utils/constants';
import {get as _get} from 'lodash';
import {iVerify, iFail} from '../../assets';
import {connect} from 'react-redux';
import {
  verifyEmail,
  setUserMortgage,
  getUserInfo,
  resendEmail,
} from '../../store/reducers';
import {getAuthToken, showSnackBar} from '../../utils/helperFunctions';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';
import {localeString} from '../../utils/i18n';

const VERIFYING_LOADING = 'Verifying...';
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
    if (
      _get(getUserInfoResponse, DB_KEYS.ERROR, null) ||
      !_get(
        getUserInfoResponse,
        DB_KEYS.VERIFICATION_FLOW.DATA_OF_IS_VERIFIED,
        true,
      )
    ) {
      this.setState({isVerifyApicalled: true});
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
      //   await resetAuthToken();
      //   navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
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
    console.log(
      'componentDidMount : verificationToken ==>',
      'verificationToken',
    );
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
        if (
          _get(verifyEmailResponse, DB_KEYS.VERIFICATION_ERROR_MESSAGE, '') ===
          localeString(LOCALE_STRING.EMAIL_VERIFICATION.ALREADY_VERIFIED)
        ) {
          getAuthToken()
            .then(res => {
              if (res === APP_CONSTANTS.FALSE_TOKEN) {
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.LOGIN_SCREEN,
                );
              } else {
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
                );
              }
            })
            .catch(err => showSnackBar({}, err));
        } else {
          this.setState({isVerifyApicalled: true});
        }
      }
    }
  }
  render() {
    const {isVerifyApicalled} = this.state;
    const {verifyEmailResponse, navigation, getUserInfoResponse} = this.props;
    let isNotVerified =
      _get(verifyEmailResponse, DB_KEYS.ERROR, false) ||
      !_get(
        getUserInfoResponse,
        DB_KEYS.VERIFICATION_FLOW.DATA_OF_IS_VERIFIED,
        true,
      );
    if (!isVerifyApicalled)
      return <LoadingModal loadingText={VERIFYING_LOADING} />;
    else
      return (
        <View style={{flex: 1}}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            rightIconPresent
            onBackPress={() => {}}
            title={localeString(LOCALE_STRING.EMAIL_VERIFICATION.VERIFICATION)}
          />
          {isVerifyApicalled && !isNotVerified && (
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
          {isNotVerified && isVerifyApicalled && (
            <StatusOverlay
              icon={iFail}
              firstButtonText={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.OKAY,
              )}
              handleFirstButton={() => {
                this.setState({isVerifyApicalled: false});
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.CHECK_EMAIL,
                );
              }}
              mainMessage={localeString(
                LOCALE_STRING.EMAIL_VERIFICATION.FAIL_TITLE,
              )}
              infoTitle={_get(
                verifyEmailResponse,
                DB_KEYS.VERIFICATION_ERROR_MESSAGE,
                APP_CONSTANTS.GENERAL_ERROR,
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

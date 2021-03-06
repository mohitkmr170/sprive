import React from 'react';
import {View} from 'react-native';
import {
  GeneralStatusBar,
  Header,
  StatusOverlay,
  LoadingModal,
} from '../../components';
import {
  localeString,
  getAuthToken,
  showSnackBar,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  APP_CONSTANTS,
  PAYLOAD_KEYS,
} from '../../utils';
import {get as _get} from 'lodash';
import {iVerify, iFail} from '../../assets';
import {connect} from 'react-redux';
import {
  verifyEmail,
  setUserMortgage,
  getUserInfo,
  resendEmail,
} from '../../store/reducers';
import {clearFormData} from '../../store/actions/actions';
import OneSignal from 'react-native-onesignal';

const VERIFYING_LOADING = 'Verifying...';
interface props {
  navigation: {
    navigate: (routeName: string, navParams?: object) => void;
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
  clearFormDataAction: () => void;
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
      if (_get(setUserMortgageResponse, DB_KEYS.ERROR, false)) {
        this.setState({isVerifyApicalled: true});
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL); //If Mortgage data is not found!(Case when user signIn's from another device with has no Mortgage data set), Need to be discussed
      }
      if (_get(setUserMortgageResponse, DB_KEYS.RESPONSE_DATA, null)) {
        this.props.clearFormDataAction();
        this.setState({isVerifyApicalled: true});
      }
      //   await resetAuthToken();
      //   navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
    }
  };
  async componentDidMount() {
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
          const {getUserInfo} = this.props;
          await getUserInfo();
          const {getUserInfoResponse} = this.props;
          if (
            _get(
              getUserInfoResponse,
              DB_KEYS.VERIFICATION_FLOW.DATA_OF_IS_VERIFIED,
              false,
            )
          ) {
            this.props.navigation.navigate(
              NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
            );
          } else {
            this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
          }
        } else {
          this.setState({isVerifyApicalled: true});
        }
        /*
        NOTES : This code block is to be kept for further refernce
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
        }
        */
      }
    } else {
      /*
      TODO : Number of getUserInfo API calls to be rechecked
      */
      const {getUserInfo} = this.props;
      await getUserInfo();
      showSnackBar(
        {},
        localeString(LOCALE_STRING.EMAIL_VERIFICATION.DEEPLINK_ISSUE),
      );
    }
  }
  handleFailPress = async () => {
    const {getUserInfo} = this.props;
    await getUserInfo();
    this.setState({isVerifyApicalled: false});
    const {getUserInfoResponse} = this.props;
    if (_get(getUserInfoResponse, DB_KEYS.ERROR)) {
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    } else {
      if (
        _get(
          getUserInfoResponse,
          DB_KEYS.VERIFICATION_FLOW.DATA_OF_IS_BLOCKED,
          true,
        )
      )
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.ACCOUNT_BLOCKED, {
          blockedType: DB_KEYS.RESET_PASSWORD.MALICIOUS_ATTEMPT,
        });
      else this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
    }
  };
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
              firstButtonText={localeString(LOCALE_STRING.GLOBAL.OKAY)}
              handleFirstButton={() => {
                const externalUserId = _get(
                  getUserInfoResponse,
                  DB_KEYS.PUSH_NOTIFICATION,
                  '',
                );
                if (externalUserId) {
                  OneSignal.setExternalUserId(externalUserId);
                }
                navigation.navigate(NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN);
              }}
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
              firstButtonText={localeString(LOCALE_STRING.GLOBAL.OKAY)}
              handleFirstButton={() => this.handleFailPress()}
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
  clearFormDataAction: () => dispatch(clearFormData()),
});

export const DeepLinkLanding = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDeepLinkLanding);

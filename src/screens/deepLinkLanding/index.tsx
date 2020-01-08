import React from 'react';
import {View} from 'react-native';
import {
  GeneralStatusBar,
  Header,
  StatusOverlay,
  LoadingModal,
} from '../../components';
import {DB_KEYS, NAVIGATION_SCREEN_NAME} from '../../utils/constants';
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
      }
      //   // await resetAuthToken();
      //   navigation.navigate(NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN);
      // }
    }
  };
  async componentDidMount() {
    const {getUserInfo} = this.props;
    await getUserInfo();
    let verificationToken = _get(this.props.navigation, 'state.params', null)
      .deepLinkToken;
    console.log('componentDidMount : verificationToken ==>', verificationToken);
    if (verificationToken) {
      const {verifyEmail} = this.props;
      this.setState({loading: true});
      const payload = {
        verification_token: verificationToken,
      };
      await verifyEmail(payload);
      const {verifyEmailResponse} = this.props;
      if (!_get(verifyEmailResponse, 'error', false)) {
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
    let isVerified = _get(verifyEmailResponse, 'error', false);
    if (!isVerifyApicalled) return <LoadingModal loadingText="Verifying..." />;
    else
      return (
        <View style={{flex: 1}}>
          <GeneralStatusBar />
          <Header leftIconPresent onBackPress={() => {}} title="Verification" />
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
              handleFirstButton={() =>
                this.setState({isVerifyApicalled: false})
              }
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

export const DeepLinkLanding = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDeepLinkLanding);

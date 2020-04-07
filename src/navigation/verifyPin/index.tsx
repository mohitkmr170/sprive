import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Header,
  GeneralStatusBar,
  CodeInput,
  LoadingModal,
} from '../../components';
import {styles} from './styles';
import {
  getUserInfo,
  getMonthlyPaymentRecord,
  getProjectedData,
  getUserMortgageData,
  getUserGoal,
  getPendingTask,
} from '../../store/reducers';
import {connect} from 'react-redux';
import {
  localeString,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  APP_CONSTANTS,
  PAYLOAD_KEYS,
  COLOR,
} from '../../utils';
import {verifyUserPin} from '../../store/reducers';
import OneSignal from 'react-native-onesignal';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  verifyUserPin: (payload: object) => void;
  verifyUserPinResponse: object;
  getUserInfoResponse: object;
  getUserInfo: () => void;
  getUserInfoResponses: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecord: (payload: object, extraPayload: object) => void;
  getMonthlyPaymentRecordResponse: object;
  getProjectedData: (payload: object, extraPayload: object) => void;
  getProjectedDataResponse: object;
  userDataChangeEvent: object;
  triggerUserDataChange: (value: boolean) => void;
  getUserMortgageDataResponse: object;
  getUserMortgageData: (payload: object, extraPayload: object) => void;
  getUserGoal: (payload: object, extraPayload: object) => void;
  getUserGoalResponse: object;
  notification: () => void;
  notificationResponse: object;
  getPendingTask: (payload: object, extraPayload: object) => void;
  getPendingTaskResponse: object;
  handlePopupDismissed: () => void;
}
interface state {
  value: string;
  loading: boolean;
}

export class UnconnectedVerifyPin extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
    };
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  handleUserInfo = () => {
    const {getUserInfoResponse, navigation} = this.props;
    /*
      TODO : Below condition should be reviewed later
    */
    StatusBar.setHidden(false, 'fade');
    if (
      !_get(getUserInfoResponse, DB_KEYS.VERIFICATION_FLOW.IS_VERIFIED, true)
    ) {
      if (
        _get(getUserInfoResponse, DB_KEYS.VERIFICATION_FLOW.IS_BLOCKED, true)
      ) {
        this.setState({loading: false}, () => {
          navigation.navigate(NAVIGATION_SCREEN_NAME.ACCOUNT_BLOCKED);
        });
      } else {
        this.setState({loading: false}, () => {
          navigation.navigate(NAVIGATION_SCREEN_NAME.CHECK_EMAIL);
        });
      }
    } else {
      this.preApiCalls();
    }
  };

  preApiCalls = async () => {
    const {
      getMonthlyPaymentRecord,
      getUserInfoResponses,
      getProjectedData,
      navigation,
      getUserMortgageData,
      getUserGoal,
      notificationResponse,
      getPendingTask,
    } = this.props;
    const userId = _get(getUserInfoResponses, DB_KEYS.DATA_ID, null);
    const isNotificationReceived = _get(
      notificationResponse,
      DB_KEYS.IS_NOTIFICATION_RECEIVED,
      false,
    );
    if (!getUserInfoResponses || !userId) {
      this.setState({loading: false}, () => {
        navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      });
    }
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const pendingTask_qParam = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getPendingTask({}, pendingTask_qParam);
    const {getUserMortgageDataResponse} = this.props;
    if (!_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE_DATA, null)) {
      this.setState({loading: false}, () => {
        navigation.navigate(
          isNotificationReceived
            ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
            : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
          {
            isUserDataChanged: true,
          },
        );
      });
      return;
    }
    const qParam_monthly_payment_record = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.GRAPH.CURRENT_DATE]: new Date().toISOString(),
    };
    const qParam_get_user_goal = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserGoal({}, qParam_get_user_goal);
    const {getUserGoalResponse} = this.props;
    if (!_get(getUserGoalResponse, DB_KEYS.RESPONSE_DATA, []).length) {
      this.setState({loading: false}, () => {
        navigation.navigate(
          isNotificationReceived
            ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
            : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
          {
            isUserDataChanged: true,
          },
        );
      });
      return;
    }
    const mortgageTerm = _get(
      getUserGoalResponse,
      DB_KEYS.NEW_MORTGAGE_TERM,
      null,
    );
    const monthlyOverPayment = _get(
      getUserGoalResponse,
      DB_KEYS.GOAL_OVERPAYMENT,
      null,
    );
    if (
      !(!monthlyOverPayment && mortgageTerm === APP_CONSTANTS.MIN_GOAL_VALUE)
    ) {
      await getMonthlyPaymentRecord({}, qParam_monthly_payment_record);
      const qParamProjectData = {
        user_id: _get(getUserInfoResponses, DB_KEYS.DATA_ID, null),
      };
      await getProjectedData({}, qParamProjectData);
      const externalUserId = _get(
        getUserInfoResponses,
        DB_KEYS.PUSH_NOTIFICATION,
        '',
      );
      if (externalUserId) {
        OneSignal.setExternalUserId(externalUserId);
      }
      {
        this.setState({loading: false}, () => {
          navigation.navigate(
            isNotificationReceived
              ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
              : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
            {
              isUserDataChanged: false,
            },
          );
        });
      }
    } else {
      this.setState({loading: false}, () => {
        navigation.navigate(
          isNotificationReceived
            ? NAVIGATION_SCREEN_NAME.REPORT_ISSUE
            : NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
          {
            isUserDataChanged: true,
          },
        );
      });
    }
  };

  handleCode = async (code: string) => {
    if (code.length === APP_CONSTANTS.PIN_CELL_COUNT) {
      const {verifyUserPin, getUserInfoResponses} = this.props;
      const payload = {
        [PAYLOAD_KEYS.USER_ID]: _get(
          getUserInfoResponses,
          DB_KEYS.USER_ID,
          null,
        ),
        [PAYLOAD_KEYS.TWO_FACTOR_AUTH.PIN]: code,
      };
      await verifyUserPin(payload);
      const {verifyUserPinResponse} = this.props;
      if (!_get(verifyUserPinResponse, DB_KEYS.ERROR, true)) {
        this.setState({loading: true}, () => {
          this.handleUserInfo();
        });
      }
    }
  };

  render() {
    if (this.state.loading) {
      return <LoadingModal loadingText="Loading..." />;
    } else
      return (
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.mainContainer}>
            <GeneralStatusBar />
            <Header />
            <View style={styles.centerContainer}>
              <Text style={styles.headerText}>
                {localeString(LOCALE_STRING.SECURE_LOGIN.VERIFY_PIN_HEADER)}
              </Text>
              <View style={styles.codeInputContainer}>
                <CodeInput getCompleteCode={this.handleCode} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
  }
}
const mapStateToProps = state => ({
  verifyUserPinResponse: state.verifyUserPin,
  getUserInfoResponse: state.getUserInfo.response,
  getUserInfoResponses: state.getUserInfo,
  getMonthlyPaymentRecordResponse: state.getMonthlyPaymentRecord,
  getProjectedDataResponse: state.getProjectedData,
  userDataChangeEvent: state.userDataChangeReducer,
  getUserMortgageDataResponse: state.getUserMortgageData,
  getUserGoalResponse: state.getUserGoal,
  notificationResponse: state.notification,
  getPendingTaskResponse: state.getPendingTask,
});

const bindActions = dispatch => ({
  verifyUserPin: payload => dispatch(verifyUserPin.fetchCall(payload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  getMonthlyPaymentRecord: (payload, extraPayload) =>
    dispatch(getMonthlyPaymentRecord.fetchCall(payload, extraPayload)),
  getProjectedData: (payload, extraPayload) =>
    dispatch(getProjectedData.fetchCall(payload, extraPayload)),
  triggerUserDataChange: value => dispatch(triggerUserDataChangeEvent(value)),
  getUserMortgageData: (payload, extraPayload) =>
    dispatch(getUserMortgageData.fetchCall(payload, extraPayload)),
  getUserGoal: (payload, extraPayload) =>
    dispatch(getUserGoal.fetchCall(payload, extraPayload)),
  notification: () => dispatch(notification()),
  getPendingTask: (payload, extraPayload) =>
    dispatch(getPendingTask.fetchCall(payload, extraPayload)),
});

export const VerifyPin = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedVerifyPin);

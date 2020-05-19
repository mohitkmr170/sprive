import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  localeString,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  WEB_VIEW_PARAMS,
  DB_KEYS,
  PAYLOAD_KEYS,
  NOTIFICATION_CONSTANTS,
} from '../../utils';
import {
  dismissSingleNotification,
  getAllNotifications,
} from '../../store/reducers';
import {get as _get} from 'lodash';
import {connect} from 'react-redux';
import {styles} from './styles';
import Moment from 'moment';
import {policyUpdate} from 'src/store/actions/actions';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
  };
  policyUpdate: () => void;
  policyUpdateResponse: object;
  getAllNotifications: (payload: object, extraPayload: object) => void;
  dismissSingleNotification: (payload: object, qParams: object) => void;
  dismissSingleNotificationResponse: object;
  getUserInfoResponse: object;
}
interface state {}

export class UnconnectedPolicyUpdate extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleTermsAndCondition = () => {
    this.handleNotificationAction();
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.GENERIC_WEB_VIEW, {
      webViewUri: WEB_VIEW_PARAMS.WEB_VIEW_URI_TERMS,
      isPolicy: true,
    });
  };
  handleNotificationAction = async () => {
    const {
      dismissSingleNotification,
      getUserInfoResponse,
      policyUpdateResponse,
    } = this.props;
    const payload = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
      dismissed: true,
    };
    const qParam = _get(
      policyUpdateResponse,
      NOTIFICATION_CONSTANTS.NOTIFCATION_STORE_ID,
      null,
    )
      ? {
          [PAYLOAD_KEYS.ID]: _get(
            policyUpdateResponse,
            NOTIFICATION_CONSTANTS.NOTIFCATION_STORE_ID,
            null,
          ),
        }
      : {
          [PAYLOAD_KEYS.NOTIFICATION.PUSH_NOTIFICATION_ID]: _get(
            getUserInfoResponse,
            DB_KEYS.PUSH_NOTIFICATION,
            null,
          ),
          [PAYLOAD_KEYS.NOTIFICATION.ONESIGNAL_MESSAGE_ID]: _get(
            policyUpdateResponse,
            NOTIFICATION_CONSTANTS.ONESIGNAL_MESSAGE_ID,
            null,
          ),
        };
    await dismissSingleNotification(payload, qParam);
    const {dismissSingleNotificationResponse, getAllNotifications} = this.props;
    if (!_get(dismissSingleNotificationResponse, DB_KEYS.ERROR, true)) {
      const qParam = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          null,
        ),
        [PAYLOAD_KEYS.NOTIFICATION.LIMIT]: 0,
      };
      await getAllNotifications({}, qParam);
      this.setState({loading: false});
    }
  };
  render() {
    return (
      <View style={styles.policyUpdateContainer}>
        <View style={styles.policyUpdateInnerContainer}>
          <Text style={styles.hiThereText}>
            {localeString(LOCALE_STRING.POLICY_UPDATE.HI_THERE)}
          </Text>
          <Text style={styles.recentText}>
            {localeString(LOCALE_STRING.POLICY_UPDATE.RECENTLY)} {'\n'}{' '}
            <Text
              style={styles.termsAndConditionText}
              onPress={() => this.handleTermsAndCondition()}>
              {localeString(LOCALE_STRING.POLICY_UPDATE.TANDC)}
            </Text>{' '}
            {localeString(LOCALE_STRING.POLICY_UPDATE.TAKE_A_LOOK)}
          </Text>
          <Text style={styles.allUsersText}>
            {localeString(LOCALE_STRING.POLICY_UPDATE.ALL_USERS)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.handleNotificationAction();
              this.props.policyUpdate();
            }}>
            <Text style={styles.okayText}>
              {localeString(LOCALE_STRING.GLOBAL.OKAY)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  dismissSingleNotificationResponse: state.dismissSingleNotification,
  policyUpdateResponse: state.policyUpdate,
});

const bindActions = dispatch => ({
  dismissSingleNotification: (payload, extraPayload) =>
    dispatch(dismissSingleNotification.fetchCall(payload, extraPayload)),
  getAllNotifications: (payload, extraPayload) =>
    dispatch(getAllNotifications.fetchCall(payload, extraPayload)),
});

export const PolicyUpdate = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedPolicyUpdate);

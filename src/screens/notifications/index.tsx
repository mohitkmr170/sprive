import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import {Header, GeneralStatusBar, LoadingModal} from '../../components';
import {cross} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import Moment from 'moment';
import {
  getAllNotifications,
  dismissSingleNotification,
  dismissAllNotifications,
} from '../../store/reducers';
import {
  paymentReminder,
  policyUpdate,
  notification,
} from '../../../src/store/actions/actions';
import {
  COLOR,
  localeString,
  LOCALE_STRING,
  PAYLOAD_KEYS,
  DB_KEYS,
  NOTIFICATION_CONSTANTS,
  SEARCH_ADDRESS,
  NOTIFICATION_TYPES,
  showSnackBar,
  APP_CONSTANTS,
  APP_KEYS,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  getUserInfoResponse: object;
  paymentReminder: (notificationId: number) => void;
  policyUpdate: (notificationId: number) => void;
  notification: (notificationId: number) => void;
  getAllNotifications: (payload: object, extraPayload: object) => void;
  getAllNotificationsResponse: object;
  dismissSingleNotification: (payload: object, qParams: object) => void;
  dismissSingleNotificationResponse: object;
  dismissAllNotifications: (payload: object, qParams: object) => void;
  dismissAllNotificationsResponse: object;
}
interface state {
  loading: boolean;
}

export class UnconnectedNotifications extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      loading: true,
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  componentDidMount = async () => {
    const {getUserInfoResponse, getAllNotifications} = this.props;
    const qParam = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
    };
    await getAllNotifications({}, qParam);
    this.setState({
      loading: false,
    });
  };

  handleClearAll = async () => {
    const {
      dismissAllNotifications,
      getUserInfoResponse,
      dismissAllNotificationsResponse,
      getAllNotifications,
    } = this.props;
    this.setState({loading: true});
    const payload = {
      dismissed: true,
    };
    const qParams = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
    };
    await dismissAllNotifications(payload, qParams);
    if (!_get(dismissAllNotificationsResponse, DB_KEYS.ERROR, true)) {
      const qParam = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          null,
        ),
      };
      await getAllNotifications({}, qParam);
      this.setState({loading: false});
    }
  };

  handleClear = async (notificationId: number) => {
    const {
      dismissSingleNotification,
      getUserInfoResponse,
      dismissSingleNotificationResponse,
      getAllNotifications,
    } = this.props;
    this.setState({loading: true});
    const payload = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
      dismissed: true,
    };
    const qParam = {
      id: notificationId,
    };
    await dismissSingleNotification(payload, qParam);
    if (!_get(dismissSingleNotificationResponse, DB_KEYS.ERROR, true)) {
      const qParam = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          null,
        ),
      };
      await getAllNotifications({}, qParam);
      this.setState({loading: false});
    }
  };

  handleNotification = async (targetRoute: string, notificationId: number) => {
    switch (targetRoute) {
      case NOTIFICATION_TYPES.PRIVACY_POLICY:
        await this.props.policyUpdate(notificationId);
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
        break;
      case NOTIFICATION_TYPES.PAYMENT_REMINDER:
        await this.props.paymentReminder(notificationId);
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
        break;
      case NOTIFICATION_TYPES.USER_FEEDBACK:
        await this.props.notification(notificationId);
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.REPORT_ISSUE);
        break;
      default:
        /*
        NOTES : Condition when no target is revceived
        */
        showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
    }
  };

  getNotificationColor = (category: string) => {
    switch (category) {
      case NOTIFICATION_CONSTANTS.TYPE_ERROR:
        return COLOR.NOTIFICATION_ERROR;
      case NOTIFICATION_CONSTANTS.TYPE_BLOG:
        return COLOR.NOTIFICATION_BLOG;
      case NOTIFICATION_CONSTANTS.TYPE_ACTION:
        return COLOR.NOTIFICATION_ACTION;
      default:
        return;
    }
  };

  handleTargetRoute = (targetCategory: string, item: object) => {
    const notificationData = JSON.parse(
      _get(item, NOTIFICATION_CONSTANTS.NOTIFICATION_DATA, ''),
    );
    switch (targetCategory) {
      case NOTIFICATION_CONSTANTS.SPRIVE_URL:
        this.handleNotification(
          /*
          NOTES : Actual target screen to be passed here!
          */
          _get(
            notificationData,
            DB_KEYS.NOTIFICATION_DATA.TARGET_SCREEN_NAME,
            '',
          ),
          _get(item, NOTIFICATION_CONSTANTS.NOTIFICATION_ID, ''),
        );
        break;
      case NOTIFICATION_CONSTANTS.WEB_URL:
        this.handleClear(
          _get(item, NOTIFICATION_CONSTANTS.NOTIFICATION_ID, ''),
        );
        Linking.openURL(
          _get(notificationData, DB_KEYS.NOTIFICATION_DATA.TARGET_URL, ''),
        );
        break;
      default:
        showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
    }
  };

  /*
  NOTES : item.item should be removed and updated once integrated with BE
  */

  renderNotifications = (item: object) => {
    let notificationCategory = _get(item, SEARCH_ADDRESS.ITEM, null);
    const notificationData = JSON.parse(
      _get(item, NOTIFICATION_CONSTANTS.NOTIFICATION_DATA, ''),
    );
    return (
      <TouchableOpacity
        onPress={() =>
          this.handleTargetRoute(
            notificationCategory[NOTIFICATION_CONSTANTS.TARGET_CATEGORY],
            item,
          )
        }
        style={[
          {
            backgroundColor: this.getNotificationColor(
              notificationCategory[NOTIFICATION_CONSTANTS.CATEGORY_NAME],
            ),
          },
          styles.notificationContainer,
        ]}>
        <View style={styles.middleContainer}>
          <View style={styles.textContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.titleText}>
              {_get(notificationData, DB_KEYS.NOTIFICATION_DATA.TITLE, '')}
            </Text>
            <Text style={styles.typeText}>
              {_get(notificationData, DB_KEYS.NOTIFICATION_DATA.SUB_TITLE, '')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.clearIconContainer}
            onPress={() =>
              this.handleClear(
                _get(item, NOTIFICATION_CONSTANTS.NOTIFICATION_ID, ''),
              )
            }>
            <Image source={cross} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {loading} = this.state;
    const {getAllNotificationsResponse} = this.props;
    const activeNotifications = _get(
      getAllNotificationsResponse,
      DB_KEYS.RESPONSE_DATA,
      [],
    );
    if (loading) return <LoadingModal loadingText="Loading..." />;
    else
      return (
        <View style={styles.mainContainer}>
          <View style={styles.mainContainer}>
            <GeneralStatusBar />
            <Header
              leftIconPresent
              title={localeString(LOCALE_STRING.NOTIFICATION.NOTIFICATION)}
              rightIconPresent
              onBackPress={() => this.props.navigation.goBack()}
            />
            {activeNotifications.length ? (
              <View style={styles.centerContainer}>
                <TouchableOpacity
                  style={styles.clearAllContainer}
                  onPress={() => this.handleClearAll()}>
                  <Text style={styles.dismissAllText}>
                    {localeString(LOCALE_STRING.NOTIFICATION.DISMISS_ALL)}
                  </Text>
                </TouchableOpacity>
                <View style={styles.notificationListParentContaier}>
                  <FlatList
                    data={activeNotifications}
                    extraData={this.props}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderNotifications}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.centerContainer}>
                <Text style={styles.emptyNotificationText}>
                  {localeString(LOCALE_STRING.NOTIFICATION.NO_NOTIFICATION)}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getAllNotificationsResponse: state.getAllNotifications,
  dismissSingleNotificationResponse: state.dismissSingleNotification,
  dismissAllNotificationsResponse: state.dismissAllNotifications,
});

const bindActions = dispatch => ({
  paymentReminder: notificationId => dispatch(paymentReminder(notificationId)),
  policyUpdate: notificationId => dispatch(policyUpdate(notificationId)),
  notification: notificationId => dispatch(notification(notificationId)),
  getAllNotifications: (payload, extraPayload) =>
    dispatch(getAllNotifications.fetchCall(payload, extraPayload)),
  dismissSingleNotification: (payload, extraPayload) =>
    dispatch(dismissSingleNotification.fetchCall(payload, extraPayload)),
  dismissAllNotifications: (payload, extraPayload) =>
    dispatch(dismissAllNotifications.fetchCall(payload, extraPayload)),
});

export const Notifications = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedNotifications);

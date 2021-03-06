import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';
import splashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/appFlow';
import {setNavigator} from './src/navigation/navigationService';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navigate} from './src/navigation/navigationService';
import {getUserInfo, getAllNotifications} from './src/store/reducers';
import {
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  NOTIFICATION_TYPES,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  PAYLOAD_KEYS,
} from './src/utils/constants';
import {get as _get} from 'lodash';
import OneSignal from 'react-native-onesignal';
import {
  notification as userFeedNotification,
  policyUpdate,
  paymentReminder,
  blogPostNotification,
} from './src/store/actions/actions';
import {showSnackBar, localeString} from './src/utils';

const ONE_SIGNAL_APP_ID = '7813aa25-8bd8-41e5-9d3f-387e6fd48a9f'; //Should be moved to a saparate .env file
const NOTIFICATION_DISPLAY = 2; //always display notification in shade.

const codePush = require('react-native-code-push');

/*
NOTES : To be fetched from environment variable
*/

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
}
interface state {}
class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    /*
     ******Reset system font for OnePlus device****
     */
    const TextRender = Text.render;
    Text.render = function render(props) {
      const oldProps = props;
      props = {
        ...props,
        style: [
          {
            fontFamily: STYLE_CONSTANTS.font.FONT_FAMILY.OPENSANS_REGULAR,
          },
          props.style,
        ],
      };
      try {
        return TextRender.apply(this, arguments);
      } finally {
        props = oldProps;
      }
    };
  }
  async componentDidMount() {
    /*
    NOTES : One-Signal Info
    */
    const oneSignalOptions = {kOSSettingsKeyAutoPrompt: true}; //automatically prompts the user for permission
    OneSignal.init(ONE_SIGNAL_APP_ID, oneSignalOptions); //nitializes the SDK. Accepts an OneSignal App Id and optional initialization parameters for arguments.
    OneSignal.inFocusDisplaying(NOTIFICATION_DISPLAY); //to display notification(In-App/Background)
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);
    OneSignal.addEventListener(
      DB_KEYS.ONE_SIGNAL_NOTIFICATION.RECEIVED,
      this.onReceived,
    );
    OneSignal.addEventListener(
      DB_KEYS.ONE_SIGNAL_NOTIFICATION.OPENED,
      this.onOpened,
    );
    OneSignal.addEventListener(DB_KEYS.ONE_SIGNAL_NOTIFICATION.IDS, this.onIds);
    /**
     * Hide native layer splash screen
     */
    splashScreen.hide();
    /**
     * Listener for Firebase Dynamic links
     */
    this.onDynamicLinkUnsubscribe = dynamicLinks().onLink(
      async (link: {url: string}) => {
        await store.dispatch(getUserInfo.fetchCall());
        const isBlocked = _get(
          store.getState(),
          DB_KEYS.VERIFICATION_FLOW.GET_USERO_INFO_ISBLOCKED,
          false,
        );
        if (!isBlocked) {
          var url = require('url');
          const parsed = url.parse(link.url, true).query;
          const verificationToken = _get(
            parsed,
            DB_KEYS.DEEPLINK_CONFIGS.VERIFICATION_TOKEN,
            '',
          );
          const resetPasswordToken = _get(
            parsed,
            DB_KEYS.DEEPLINK_CONFIGS.PASSWORD_RESET_TOKEN,
            '',
          );
          console.log(
            'componentDidMount : onDynamicLinkUnsubscribe : LINK ::: =>',
            verificationToken,
            resetPasswordToken,
            parsed,
            link,
          );
          navigate(
            _get(parsed, DB_KEYS.DEEPLINK_CONFIGS.SCREEN, '') ===
              DB_KEYS.DEEPLINK_CONFIGS.FORGOT_PASSWORD
              ? NAVIGATION_SCREEN_NAME.RESET_PASSWORD
              : NAVIGATION_SCREEN_NAME.DEEPLINK_SCREEN,
            {
              deepLinkToken:
                _get(parsed, DB_KEYS.DEEPLINK_CONFIGS.SCREEN, '') ===
                DB_KEYS.DEEPLINK_CONFIGS.FORGOT_PASSWORD
                  ? resetPasswordToken
                  : verificationToken,
            },
          );
        }
      },
    );
  }
  componentWillUnmount() {
    this.onDynamicLinkUnsubscribe();
    OneSignal.removeEventListener(
      DB_KEYS.ONE_SIGNAL_NOTIFICATION.RECEIVED,
      this.onReceived,
    );
    OneSignal.removeEventListener(
      DB_KEYS.ONE_SIGNAL_NOTIFICATION.OPENED,
      this.onOpened,
    );
    OneSignal.removeEventListener(
      DB_KEYS.ONE_SIGNAL_NOTIFICATION.IDS,
      this.onIds,
    );
  }
  /**
   *
   * @param notification : object : contains complete notification info and status
   */
  async onReceived(notification: any) {
    console.log(
      'onReceived : Notification received : notification => ',
      notification,
    );
    if (_get(store.getState(), DB_KEYS.USER_INFO, null)) {
      const notificationType = _get(
        notification,
        DB_KEYS.NOTIFICATION_TYPE,
        '',
      );
      const onesignal_message_id = _get(
        notification,
        DB_KEYS.ONE_SIGNAL_MESSAGE_ID,
        '',
      );
      const qParam = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          store.getState(),
          DB_KEYS.USER_INFO_P_ID,
          null,
        ),
      };
      await store.dispatch(getAllNotifications.fetchCall({}, qParam));
      switch (notificationType) {
        case NOTIFICATION_TYPES.PRIVACY_POLICY:
          await store.dispatch(
            policyUpdate({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
          break;
        case NOTIFICATION_TYPES.PAYMENT_REMINDER:
          await store.dispatch(
            paymentReminder({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
          break;
        case NOTIFICATION_TYPES.USER_FEEDBACK:
          await store.dispatch(
            userFeedNotification({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
          break;
        case NOTIFICATION_TYPES.BLOG_POST_NOTIFICATION:
          await store.dispatch(
            blogPostNotification({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
          break;
        default:
          showSnackBar(
            {},
            localeString(LOCALE_STRING.GLOBAL.NO_DATA_NOTIFICATION),
          );
      }
    }
  }

  /**
   *
   * @param openResult : object : contains notification info(body, additional data)
   */
  async onOpened(openResult: any) {
    const notificationType = _get(
      openResult.notification,
      DB_KEYS.NOTIFICATION_TYPE,
      '',
    );
    const onesignal_message_id = _get(
      openResult.notification,
      DB_KEYS.ONE_SIGNAL_MESSAGE_ID,
      '',
    );
    const qParam = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        store.getState(),
        DB_KEYS.USER_INFO_P_ID,
        null,
      ),
    };
    await store.dispatch(getAllNotifications.fetchCall({}, qParam));
    switch (notificationType) {
      case NOTIFICATION_TYPES.PRIVACY_POLICY:
        if (
          !_get(store.getState(), DB_KEYS.IS_POLICY_UPDATE_RECEIVED_FLAG, true)
        )
          await store.dispatch(
            policyUpdate({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
        break;
      case NOTIFICATION_TYPES.USER_FEEDBACK:
        if (_get(store.getState(), DB_KEYS.USER_INFO, null)) {
          await store.dispatch(
            userFeedNotification({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
          navigate(NAVIGATION_SCREEN_NAME.REPORT_ISSUE, {});
        } else
          await store.dispatch(
            userFeedNotification({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
        break;
      case NOTIFICATION_TYPES.PAYMENT_REMINDER:
        if (
          !_get(
            store.getState(),
            DB_KEYS.IS_PAYMENT_REMINDER_RECEIVED_FLAG,
            true,
          )
        )
          await store.dispatch(
            paymentReminder({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
        break;
      case NOTIFICATION_TYPES.BLOG_POST_NOTIFICATION:
        if (_get(store.getState(), DB_KEYS.USER_INFO, null)) {
          await store.dispatch(
            blogPostNotification({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
          navigate(NAVIGATION_SCREEN_NAME.NOTIFICATION_SCREEN, {});
        } else
          await store.dispatch(
            blogPostNotification({
              [PAYLOAD_KEYS.NOTIFICATION
                .ONESIGNAL_MESSAGE_ID]: onesignal_message_id,
            }),
          );
        break;
      default:
        showSnackBar(
          {},
          localeString(LOCALE_STRING.GLOBAL.NO_DATA_NOTIFICATION),
        );
    }

    console.log(
      'onOpened : Message =>',
      _get(openResult.notification, DB_KEYS.ONE_SIGNAL_NOTIFICATION.BODY, ''),
    );
    console.log(
      'onOpened : Data => ',
      _get(
        openResult.notification,
        DB_KEYS.ONE_SIGNAL_NOTIFICATION.ADDITIONAL_DATA,
        '',
      ),
    );
    console.log(
      'onOpened : isActive => ',
      _get(
        openResult.notification,
        DB_KEYS.ONE_SIGNAL_NOTIFICATION.IS_APP_IN_FOCUS,
        '',
      ),
    );
    console.log('onOpened : openResult => ', openResult);
  }

  /**
   *
   * @param device : object : contains push_notification details corresponding to the device
   */
  onIds(device: any) {
    console.log('onIds : Device info : device =>', device);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.appContainer}>
            <View style={styles.mainContainer}>
              <AppNavigator
                ref={(ref: any) => {
                  setNavigator(ref);
                }}
              />
            </View>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
export default codePush(codePushOptions)(App);

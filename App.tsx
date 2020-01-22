import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';
import splashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/appFlow';
import {setNavigator} from './src/navigation/navigationService';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navigate} from './src/navigation/navigationService';
import {getUserInfo} from './src/store/reducers';
import {NAVIGATION_SCREEN_NAME, DB_KEYS} from './src/utils/constants';
import {get as _get} from 'lodash';
import OneSignal from 'react-native-onesignal';

const ONE_SIGNAL_APP_ID = 'ce763fbb-0f60-4f44-b709-30eedbf62388'; //Should be moved to a saparate .env file
const NOTIFICATION_DISPLAY = 2; //always display notification in shade.
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
    // const TextRender = Text.render;
    // Text.render = function render(props) {
    //   const oldProps = props;
    //   props = {
    //     ...props,
    //     style: [
    //       Platform.OS === 'android'
    //         ? {fontFamily: 'Roboto', color: '#333333'}
    //         : {},
    //       props.style,
    //     ],
    //   };
    //   try {
    //     return TextRender.apply(this, arguments);
    //   } finally {
    //     props = oldProps;
    //   }
    // };
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
  onReceived(notification: any) {
    console.log(
      'onReceived : Notification received : notification => ',
      notification,
    );
  }

  /**
   *
   * @param openResult : object : contains notification info(body, additional data)
   */
  onOpened(openResult: any) {
    navigate(NAVIGATION_SCREEN_NAME.PUSH_NOTIFICATION, {});
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

export default App;

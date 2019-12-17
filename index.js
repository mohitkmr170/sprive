/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform, NativeModules} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import App from './App';
import {name as appName} from './app.json';
if (Platform.OS === 'android') {
  const {UIManager} = NativeModules;
  if (UIManager) {
    // Add gesture specific events to genericDirectEventTypes object exported from UIManager native module.
    // Once new event types are registered with react it is possible to dispatch these events to all kind of native views.
    UIManager.genericDirectEventTypes = {
      ...UIManager.genericDirectEventTypes,
      onGestureHandlerEvent: {registrationName: 'onGestureHandlerEvent'},
      onGestureHandlerStateChange: {
        registrationName: 'onGestureHandlerStateChange',
      },
    };
  }
}
//For custom Done button over the app
if (Platform.OS === 'ios') {
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setShouldShowToolbarPlaceholder(false);
}
console.ignoredYellowBox = ['Warning: `-[RCTRootView cancelTouches]`'];
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);

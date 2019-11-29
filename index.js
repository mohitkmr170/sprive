/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform, NativeModules} from 'react-native';
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
console.ignoredYellowBox = ['Warning: `-[RCTRootView cancelTouches]`'];
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);

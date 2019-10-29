/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.ignoredYellowBox = ['Warning: `-[RCTRootView cancelTouches]`'];
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);

import 'react-native-gesture-handler';
import {NavigationActions, StackActions} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';

const NAVIGATOR_CONFIG = {
  navigator: '',
};

/**
 * Function to create Navigation reference of AppFlow
 * @param nav : any : Navigation reference
 */
export function setNavigator(nav: any) {
  if (nav) {
    NAVIGATOR_CONFIG.navigator = nav;
  }
}

/**
 * Function to route along with Params
 * @param routeName : string : Navigation screen route name
 * @param params : object : Params to be passed upon navigation
 */
export function navigate(routeName: string, params: object) {
  if (NAVIGATOR_CONFIG.navigator && routeName) {
    const action = NavigationActions.navigate({routeName, params});
    NAVIGATOR_CONFIG.navigator.dispatch(action);
  }
}

/**
 * Function to route along with reset action
 * @param routeName : string : Navigation screen route name
 */
export function reset(routeName: string) {
  if (NAVIGATOR_CONFIG.navigator && routeName) {
    const action = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName})],
    });
    NAVIGATOR_CONFIG.navigator.dispatch(action);
  }
}

/**
 * Function to open drawer
 */
export function openDrawer() {
  if (NAVIGATOR_CONFIG.navigator) {
    NAVIGATOR_CONFIG.navigator.dispatch(DrawerActions.openDrawer());
  }
}

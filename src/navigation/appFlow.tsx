import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Login, SideBar, SignUp, Dashboard} from '../screens';

/**
 * Tab Navigator, can be used as a screen to which we can navigate to
 */

const TabNavigator = createBottomTabNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Login',
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        tabBarLabel: 'SignUp',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'blue',
      showIcon: true,
      labelStyle: {
        fontSize: 14,
      },
    },
  },
);

/**
 * Stack Navigator
 */

const AppStackNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    SignUpScreen: {
      screen: SignUp,
    },
    DashBoardScreen: {
      screen: Dashboard,
    },
    /**
     * TabNavigator to be Enabled when it's requirements arises
     */
    // TabNavigatorScreen: {
    //   screen: TabNavigator,
    // },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    /**
     * For custom transition navigation
     */
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 100,
    //   },
    // }),
  },
);

/**
 * Drawaer Navigator
 */

const AppNavigator = createDrawerNavigator(
  {
    AppStackNavigator: {
      screen: AppStackNavigator,
    },
  },
  {
    initialRouteName: 'AppStackNavigator',
    contentComponent: SideBar,
  },
);

export default createAppContainer(AppNavigator);

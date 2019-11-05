import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Login, SideBar, SignUp, Dashboard} from '../screens';
import {AuthLoading} from '../navigation/authLoading';

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

const AuthStackNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    SignUpScreen: {
      screen: SignUp,
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

const AppStackNavigator = createStackNavigator(
  {
    DashboardScreen: {
      screen: Dashboard,
    },
  },
  {
    initialRouteName: 'DashboardScreen',
    headerMode: 'none',
  },
);

/**
 * Switch navigator to switch between AppStack and AuthStack based on Auth status
 */

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  App: AppStackNavigator,
  Auth: AuthStackNavigator,
});

/**
 * Drawaer Navigator
 */

const AppNavigator = createDrawerNavigator(
  {
    AppSwitchNavigator: {
      screen: AppSwitchNavigator,
    },
  },
  {
    initialRouteName: 'AppSwitchNavigator',
    contentComponent: SideBar,
    drawerPosition: 'right',
  },
);

export default createAppContainer(AppNavigator);

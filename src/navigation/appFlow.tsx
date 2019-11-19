import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
  NavigationEvents,
} from 'react-navigation';
import {checkPropTypes} from 'prop-types';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Feather';
import {COLOR} from '../utils/colors';
import {STYLE_CONSTANTS} from '../utils/constants';
import {
  Login,
  SideBar,
  SignUp,
  MortgageInput,
  SaveInterest,
  DashBoard,
  SetGoal,
} from '../screens';
import {AuthLoading} from '../navigation/authLoading';
import {Alert, ViewPropTypes} from 'react-native';

/**
 * Tab Navigator, can be used as a screen to which we can navigate to
 */

const TabNavigator = createBottomTabNavigator(
  {
    DashBoard: {
      screen: DashBoard,
      navigationOptions: {
        tabBarLabel: 'DashBoard',
        tabBarIcon: ({tintColor}) => (
          <Icons name="activity" size={24} color={tintColor} />
        ),
      },
    },
    SetGoal: {
      screen: SetGoal,
      navigationOptions: {
        tabBarLabel: 'Goal',
        tabBarIcon: ({tintColor}) => (
          <Icons name="award" size={24} color={tintColor} />
        ),
      },
    },
    SideBar: {
      screen: SideBar,
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: ({tintColor}) => (
          <Icon name="menu" size={24} color={tintColor} />
        ),
        tabBarOnPress: () => {
          // handleInfo();
          // props.screenProps.drawerNavigation.navigate('DrawerOpen');
        } /*
        TODO : Onpress of this, Side bar should be opened
        */,
      },
    },
  },
  {
    initialRouteName: 'DashBoard',
    tabBarOptions: {
      activeTintColor: COLOR.PRIMARY,
      inactiveTintColor: COLOR.INACTIVE_TAB,
      showIcon: true,
      labelStyle: {
        fontSize: STYLE_CONSTANTS.font.SIZE.TINY,
        lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.SMALL,
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
    MortgageInputScreen: {
      screen: MortgageInput,
    },
    SaveInterestScreen: {
      screen: SaveInterest,
    },
  },
  {
    initialRouteName: 'MortgageInputScreen',
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
      screen: DashBoard,
    },
    SetGoalScreen: {
      screen: SetGoal,
    },
    /**
     * TabNavigator to be Enabled when it's requirements arises
     */
    TabNavigatorScreen: {
      screen: TabNavigator,
    },
  },
  {
    initialRouteName: 'TabNavigatorScreen',
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
    statusBarAnimation: 'slide',
  },
);

export default createAppContainer(AppNavigator);

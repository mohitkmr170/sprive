import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../utils/colors';
import {openDrawer} from './navigationService';
import {STYLE_CONSTANTS} from '../utils/constants';
import {
  Login,
  SideBar,
  SignUp,
  MortgageInput,
  SaveInterest,
  DashBoard,
  SetGoal,
  OverPayment,
  OverpaymentHistory,
  ReportIssue,
  UpdateMortgage,
  IntroCarousel,
  CheckEmail,
  DeepLinkLanding,
  AccountBlocked,
  ForgotPassword,
  ResetPassword,
  PasswordCheckMail,
  UpdatePassword,
  PushNotification,
  UserProfile,
  UserAddress,
  SearchAddress,
  UserProfileViewMode,
  HomeOwnerShip,
  CreateSecurityPin,
  VerifySecurityPin,
  Profile,
  Settings,
} from '../screens';
import {AuthLoading} from '../navigation/authLoading';
import {VerifyPin} from '../navigation/verifyPin';
import {GenericWebView} from '../components';

/**
 * Tab Navigator, can be used as a screen to which we can navigate to
 */

const TabNavigator = createBottomTabNavigator(
  {
    DashboardScreen: {
      screen: DashBoard,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <Icons name="activity" size={24} color={tintColor} />
        ),
      },
    },
    SetGoalScreen: {
      screen: SetGoal,
      navigationOptions: {
        tabBarLabel: 'Goal',
        tabBarIcon: ({tintColor}) => (
          <IconAnt name="flag" size={24} color={tintColor} />
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
          openDrawer();
        } /*
        TODO : Onpress of this, Side bar should be opened
        */,
      },
    },
  },
  {
    initialRouteName: 'DashboardScreen',
    tabBarOptions: {
      labelPosition: 'below-icon',
      style: {height: 2 * STYLE_CONSTANTS.margin.HUGE},
      activeTintColor: COLOR.PRIMARY,
      inactiveTintColor: COLOR.INACTIVE_TAB,
      showIcon: true,
      labelStyle: {
        fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
        marginBottom: STYLE_CONSTANTS.margin.SMALLER,
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
    IntroCarouselScreen: {
      screen: IntroCarousel,
    },
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
    CheckEmailScreen: {
      screen: CheckEmail,
    },
    AccountBlockedScreen: {
      screen: AccountBlocked,
      navigationOptions: {
        gesturesEnabled: false, //This is to disable back gesture handler
      },
    },
    ForgotPasswordScreen: {
      screen: ForgotPassword,
    },
    ResetPasswordScreen: {
      screen: ResetPassword,
    },
    PasswordCheckMailScreen: {
      screen: PasswordCheckMail,
    },
    GenericWebViewScreen: {
      screen: GenericWebView,
    },
  },
  {
    initialRouteName: 'IntroCarouselScreen',
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
    // DashboardScreen: {
    //   screen: DashBoard,
    // },
    // SetGoalScreen: {
    //   screen: SetGoal,
    // },
    /**
     * TabNavigator to be Enabled when it's requirements arises
     */
    TabNavigatorScreen: {
      screen: TabNavigator,
    },
    OverPaymentScreen: {
      screen: OverPayment,
    },
    OverpaymentHistoryScreen: {
      screen: OverpaymentHistory,
    },
    ReportIssueScreen: {
      screen: ReportIssue,
    },
    UpdateMortgageScreen: {
      screen: UpdateMortgage,
    },
    UpdatePasswordScreen: {
      screen: UpdatePassword,
    },
    PushNotificationScreen: {
      screen: PushNotification,
    },
    UserProfileScreen: {
      screen: UserProfile,
    },
    UserAddressScreen: {
      screen: UserAddress,
    },
    SearchAddressScreen: {
      screen: SearchAddress,
    },
    UserProfileViewModeScreen: {
      screen: UserProfileViewMode,
    },
    HomeOwnerShipScreen: {
      screen: HomeOwnerShip,
    },
    CreateSecurityPinScreen: {
      screen: CreateSecurityPin,
    },
    VerifySecurityPinScreen: {
      screen: VerifySecurityPin,
    },
    ProfileScreen: {
      screen: Profile,
    },
    SettingsScreen: {
      screen: Settings,
    },
  },
  {
    initialRouteName: 'TabNavigatorScreen',
    headerMode: 'none',
  },
);

const AppStackWithDrawer = createDrawerNavigator(
  {
    AppStackNavigator: {
      screen: AppStackNavigator,
    },
  },
  {
    initialRouteName: 'AppStackNavigator',
    contentComponent: SideBar,
    drawerPosition: 'right',
    statusBarAnimation: 'slide',
    drawerWidth: '75%',
  },
);

const DeepLinkStack = createStackNavigator(
  {
    DeepLinkLandingScreen: {
      screen: DeepLinkLanding,
    },
  },
  {
    initialRouteName: 'DeepLinkLandingScreen',
    headerMode: 'none',
  },
);
/**
 * Switch navigator to switch between AppStack and AuthStack based on Auth status
 */

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  VerifyPinScreen: VerifyPin,
  App: AppStackWithDrawer,
  Auth: AuthStackNavigator,
  DeepLink: DeepLinkStack,
});

/**
 * Drawaer Navigator
 */

// const AppNavigator = createDrawerNavigator(
//   {
//     AppSwitchNavigator: {
//       screen: AppSwitchNavigator,
//     },
//   },
//   {
//     initialRouteName: 'AppSwitchNavigator',
//     contentComponent: SideBar,
//     drawerPosition: 'right',
//     statusBarAnimation: 'slide',
//   },
// );

export default createAppContainer(AppNavigator);

import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../sideBar/styles';
import {connect} from 'react-redux';
import {GeneralStatusBar} from '../../components';
import {
  NAVIGATION_SCREEN_NAME,
  APP_CONSTANTS,
  DB_KEYS,
} from '../../utils/constants';
import {setAuthToken, showSnackBar} from '../../utils/helperFunctions';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../../utils/colors';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  getUserInfoResponse: object;
}

interface state {}

export class UnconnectedSideBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  SIDEBAR_DATA = [
    {
      title: 'Log Out',
      icon: 'logout',
      action: () => this.handleLogOut(),
    },
    {
      title: 'Overpayment History',
      icon: 'copy1',
      action: () =>
        this.props.navigation.navigate(
          NAVIGATION_SCREEN_NAME.OVERPAYMENT_HISTORY,
        ),
    },
  ];
  handleLogOut = () => {
    const {getUserInfoResponse} = this.props;
    setAuthToken(
      APP_CONSTANTS.FALSE_TOKEN,
      _get(getUserInfoResponse, DB_KEYS.CURRENT_USER_EMAIL, ''),
    )
      .then(response => {
        // showSnackBar(APP_CONSTANTS.LOG_OUT);
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      })
      .catch(error => {
        showSnackBar(APP_CONSTANTS.GENERAL_ERROR);
      });
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <GeneralStatusBar />
        {this.SIDEBAR_DATA.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={item.action}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Icon name={item.icon} size={20} />
              <Text
                key={index}
                style={{
                  paddingLeft: 12,
                  fontSize: 18,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = () => ({});

export const SideBar = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSideBar);

import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header} from '../../components';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {setAuthToken, showSnackBar} from '../../utils/helperFunctions';
import {
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  APP_CONSTANTS,
} from '../../utils/constants';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getUserInfoResponse: () => void;
}

interface state {}
export class UnconnectedDashBoard extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isLoggedOut: false,
    };
  }

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
      <View style={styles.mainContainer}>
        <Header />
        <View style={styles.middleContainer}>
          <Text>DashBaord Screen</Text>
        </View>
        <Button
          title="Log Out"
          onPress={() => {
            this.setState({isLoggedOut: true});
            this.handleLogOut();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = () => ({});

export const DashBoard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);

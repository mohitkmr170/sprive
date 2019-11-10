import React from 'react';
import {ImageBackground, ActivityIndicator, StyleSheet} from 'react-native';
import {splashScreen} from '../assets';
import {getAuthToken} from '../utils/helperFunctions';
import {get as _get} from 'lodash';
import {getUserInfo} from '../store/reducers';
import {connect} from 'react-redux';
import {DB_KEYS} from '../utils/constants';

const AUTH_STACK = 'Auth';
const APP_STACK = 'App';
interface props {
  navigation: {
    navigate: (firstParam: any) => void;
    getUserInfo: () => void;
    getUserInfoResponse: object;
  };
}

interface state {}

class UnconnectedAuthLoading extends React.Component<props, state> {
  componentDidMount() {
    getAuthToken()
      .then(res => this.authCheck(res))
      .catch(err => {
        console.log(err);
      });
  }

  // Auth check, based on which navigation to auth/app stack is decided

  async authCheck(authToken: string) {
    // Token does not exist locally
    if (!authToken) this.props.navigation.navigate(AUTH_STACK);
    // Token exists
    else {
      const {getUserInfo} = this.props;
      await getUserInfo();
      const {getUserInfoResponse} = this.props;
      if (_get(getUserInfoResponse, DB_KEYS.AUTH_STATUS, false)) {
        this.props.navigation.navigate(APP_STACK);
      } else this.props.navigation.navigate(AUTH_STACK);
    }
  }
  render() {
    return (
      <ImageBackground
        source={splashScreen}
        resizeMode="stretch"
        style={styles.mainContainer}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo.response,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
});

export const AuthLoading = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedAuthLoading);

import React from 'react';
import {ImageBackground, ActivityIndicator, StyleSheet} from 'react-native';
import {splashScreen} from '../assets';
import {getAuthToken} from '../utils/helperFuntions';
import {get as _get} from 'lodash';
import {getUserInfo} from '../store/reducers';
import {connect} from 'react-redux';
interface props {
  navigation: {
    navigate: (firstParam: any) => void;
    getUserInfo: () => void;
    getUserInfoResponse: object;
  };
}

interface state {}

class UnconnectedAuthLoading extends React.Component<props, state> {
  async componentDidMount() {
    getAuthToken()
      .then(res => this.authCheck(res))
      .catch(err => {
        console.log(err);
      });
  }

  // Auth check, based on which navigation to auth/app stack is decided

  async authCheck(authToken: string) {
    // Token does not exist locally
    if (authToken === undefined) this.props.navigation.navigate('Auth');
    // Token exists
    else {
      const {getUserInfo} = this.props;
      try {
        await getUserInfo();
        const {getUserInfoResponse} = this.props;
        if (_get(getUserInfoResponse, 'status', false)) {
          this.props.navigation.navigate('App');
        } else this.props.navigation.navigate('Auth');
      } catch (error) {
        console.log(error);
      }
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

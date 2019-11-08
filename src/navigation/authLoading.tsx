import React from 'react';
import {ImageBackground, ActivityIndicator} from 'react-native';
import {splashScreen} from '../assets';
import {getAuthToken} from '../utils/helperFuntions';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (firstParam: any) => void;
  };
}

interface state {}

export class AuthLoading extends React.Component<props, state> {
  async componentDidMount() {
    getAuthToken()
      .then(res => this.authCheck(res))
      .catch(err => {
        console.log(err);
      });
  }

  // Auth check, based on which navigation to auth/app stack is decided

  authCheck(authToken: string) {
    // Token does not exist locally
    if (authToken === undefined) this.props.navigation.navigate('Auth');
    //Complete auth flow, initial screen === "MortgageFormDataScreen"
    // Token exists
    else {
      /*
      TODO : GetUserInfo(authToken)
      if(success) navigate('Home')
      else navigagte('SignIn') ==> depends on user to signIn/signUp
      */
      setTimeout(() => {
        this.props.navigation.navigate('App');
      }, 2000);
    }
  }
  render() {
    return (
      <ImageBackground
        source={splashScreen}
        resizeMode="stretch"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      />
    );
  }
}

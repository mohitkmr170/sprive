import React from 'react';
import {ImageBackground, ActivityIndicator} from 'react-native';
import {splashScreen} from '../assets';

interface props {
  navigation: {
    navigate: (firstParam: any) => void;
  };
}

interface state {}

export class AuthLoading extends React.Component<props, state> {
  componentDidMount() {
    this.authCheck();
  }

  // Auth check, based on which navigation to auth/app stack is decided

  authCheck() {
    //This is an API Mock, Auth check will be added here
    setTimeout(() => {
      this.props.navigation.navigate('Auth');
    }, 2000);
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

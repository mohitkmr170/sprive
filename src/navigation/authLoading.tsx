import React from 'react';
import {View, ActivityIndicator} from 'react-native';

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

  /**
   * Auth check, based on which navigation to auth/app stack is decided
   */

  authCheck() {
    setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 2000);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
}

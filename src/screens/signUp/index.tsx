import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {SignUpForm} from './signupForm';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
  };
}

interface state {}

export class SignUp extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <SignUpForm navigation={navigation} />
      </View>
    );
  }
}

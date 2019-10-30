import React from 'react';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
        <SignUpForm navigation={navigation} />
      </KeyboardAwareScrollView>
    );
  }
}

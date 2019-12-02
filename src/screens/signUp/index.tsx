import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {SignUpForm} from './signupForm';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';

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
  componentDidMount = async () => {
    //Send user event to GA.
    _gaSetCurrentScreen('SignupScreen');
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <SignUpForm navigation={navigation} />
      </View>
    );
  }
}

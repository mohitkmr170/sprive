import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {LoginForm} from './loginForm';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';
import {NAVIGATION_SCREEN_NAME} from '../../utils/constants';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
  };
}
interface state {}

export class Login extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    //Send user event to GA.
    _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <LoginForm navigation={navigation} />
      </View>
    );
  }
}

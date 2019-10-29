import React, {Props} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';

interface props {
  navigation: {
    navigate: Function;
  };
}
interface state {}

export class Login extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  async UNSAFE_componentWillMount() {}

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text>Login Screen</Text>
        </View>
        <Button
          title="SignUp"
          onPress={() => this.props.navigation.navigate('SignUpScreen')}
        />
      </View>
    );
  }
}

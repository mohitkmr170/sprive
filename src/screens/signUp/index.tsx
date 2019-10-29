import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';

interface props {
  navigation: any;
}

interface state {}

export class SignUp extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const buttons = ['Hello', 'World'];
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text>SignUp Screen</Text>
        </View>
        <Button title="Login" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

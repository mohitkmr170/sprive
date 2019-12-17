import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

interface props {
  serverError: string;
}
interface state {}

export class ServerErrorContainer extends React.Component<props, state> {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.errorTextStyle}>{this.props.serverError}</Text>
      </View>
    );
  }
}

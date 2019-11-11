import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header} from '../../components';

export class SetGoal extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Header />
        <View style={styles.middleContainer}>
          <Text>Set Goal Screen</Text>
        </View>
      </View>
    );
  }
}

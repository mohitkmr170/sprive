import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLOR} from '../../utils/colors';
import {localeString} from '../../utils/i18n';
import {styles} from './styles';

const BACK_BUTTON = 'global.backButton';
interface props {
  title: String;
  onBackPress: () => void;
}
interface state {}

export class Header extends React.Component<props, state> {
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <Text style={styles.sideText}>{localeString(BACK_BUTTON)}</Text>
        </TouchableOpacity>
        <Text style={styles.middleContainer}>{this.props.title}</Text>
        <Text style={styles.sideText}>Icon</Text>
      </View>
    );
  }
}
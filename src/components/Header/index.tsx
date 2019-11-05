import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {iBack} from '../../assets';
interface props {
  title: String;
  rightIconPresent: boolean;
  onBackPress: () => void;
}
interface state {}

export class Header extends React.Component<props, state> {
  render() {
    const {rightIconPresent} = this.props;
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this.props.onBackPress}>
          {/* .svg not working for SvgUri, UI specs to be inspected */}
          <Image source={iBack} height={24} width={24} />
        </TouchableOpacity>
        {rightIconPresent && (
          <Text style={styles.middleContainer}>{this.props.title}</Text>
        )}
        {rightIconPresent && <Text style={styles.sideText}>Icon</Text>}
      </View>
    );
  }
}

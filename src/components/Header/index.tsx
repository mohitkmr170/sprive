import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {iBack} from '../../assets';
import {APP_CONSTANTS} from '../../utils/constants';
interface props {
  title: String;
  rightIconPresent: boolean;
  onBackPress: () => void;
  iconName: any;
}
interface state {}

export class Header extends React.Component<props, state> {
  render() {
    const {rightIconPresent, iconName} = this.props;
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={this.props.onBackPress}
          hitSlop={APP_CONSTANTS.HIT_SLOP}
          style={{paddingVertical: 12}}>
          {/* .svg not working for SvgUri, UI specs to be inspected */}
          <Image source={iBack} height={24} width={24} />
        </TouchableOpacity>
        {rightIconPresent && (
          <Text style={styles.middleContainer}>{this.props.title}</Text>
        )}
        {rightIconPresent && <Image source={iconName} height={40} width={40} />}
      </View>
    );
  }
}

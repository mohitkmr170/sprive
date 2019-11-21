import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {styles} from './styles';
import {iBack} from '../../assets';
import {APP_CONSTANTS} from '../../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
interface props {
  onIncrementPress: () => void;
  onDecrementPress: () => void;
}
interface state {}

export class IncDecCounter extends React.Component<props, state> {
  render() {
    const {onIncrementPress, onDecrementPress} = this.props;
    return (
      <View
        style={{
          backgroundColor: '#4E5AAF',
          paddingHorizontal: 24,
          paddingVertical: 10,
          borderRadius: 8,
        }}>
        <TouchableOpacity
          style={{borderBottomColor: '#fff', borderBottomWidth: 2}}
          onPress={onIncrementPress}
          hitSlop={APP_CONSTANTS.HIT_SLOP}>
          <Icon name="ios-arrow-round-up" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDecrementPress}
          hitSlop={APP_CONSTANTS.HIT_SLOP}>
          <Icon name="ios-arrow-round-down" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

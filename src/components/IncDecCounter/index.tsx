import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {COLOR, APP_CONSTANTS, ICON, STYLE_CONSTANTS} from '../../utils';
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
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={onIncrementPress}
          hitSlop={APP_CONSTANTS.HIT_SLOP}>
          <Icon
            name={ICON.UP}
            size={STYLE_CONSTANTS.padding.HUGE}
            color={COLOR.WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDecrementPress}
          hitSlop={APP_CONSTANTS.HIT_SLOP}>
          <Icon
            name={ICON.DOWN}
            size={STYLE_CONSTANTS.padding.HUGE}
            color={COLOR.WHITE}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

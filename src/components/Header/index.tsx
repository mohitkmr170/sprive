import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {iBack} from '../../assets';
import {APP_CONSTANTS} from '../../utils/constants';
interface props {
  title: String;
  rightIconPresent: boolean;
  leftIconPresent?: boolean;
  onBackPress: () => void;
  iconName: any;
  navigation: {
    navigate: (routeName: string) => void;
  };
  iconPath: string;
}
interface state {}

export class Header extends React.Component<props, state> {
  render() {
    const {
      rightIconPresent,
      iconName,
      leftIconPresent,
      iconPath,
      iconStyle,
      navigation,
    } = this.props;
    return (
      <View style={styles.mainContainer}>
        {leftIconPresent ? (
          <TouchableOpacity
            onPress={this.props.onBackPress}
            hitSlop={APP_CONSTANTS.HIT_SLOP}
            style={styles.touchable}>
            {/* .svg not working for SvgUri, UI specs to be inspected */}
            <Image source={iBack} height={24} width={24} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyLeftContainer} />
        )}
        {rightIconPresent && (
          <Text style={styles.middleContainer}>{this.props.title}</Text>
        )}
        {rightIconPresent && (
          <TouchableOpacity
            onPress={() => navigation.navigate(iconPath)}
            style={iconStyle}>
            <Image source={iconName} height={40} width={40} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

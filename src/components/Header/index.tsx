import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {iBack} from '../../assets';
import {APP_CONSTANTS, STYLE_CONSTANTS} from '../../utils';
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
            <Image
              source={iBack}
              height={STYLE_CONSTANTS.margin.LARGER}
              width={STYLE_CONSTANTS.margin.LARGER}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyLeftContainer} />
        )}
        {rightIconPresent && (
          <Text
            style={[
              styles.middleContainer,
              {
                paddingLeft: leftIconPresent
                  ? 0
                  : STYLE_CONSTANTS.margin.LARGER,
              },
            ]}>
            {this.props.title}
          </Text>
        )}
        {rightIconPresent && (
          <TouchableOpacity
            onPress={() => navigation.navigate(iconPath)}
            style={iconStyle}>
            <Image
              source={iconName}
              height={STYLE_CONSTANTS.margin.HUMONGOUS}
              width={STYLE_CONSTANTS.margin.HUMONGOUS}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

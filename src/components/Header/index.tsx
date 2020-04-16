import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {iBack} from '../../assets';
import {
  localeString,
  LOCALE_STRING,
  APP_CONSTANTS,
  STYLE_CONSTANTS,
} from '../../utils';
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
          <View
            style={{
              width: STYLE_CONSTANTS.margin.HUMONGOUS,
              height: STYLE_CONSTANTS.margin.HUMONGOUS,
            }}>
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
          </View>
        ) : (
          <View style={styles.emptyLeftContainer} />
        )}
        {rightIconPresent && (
          <View style={styles.middleTextContainer}>
            <Text
              style={[
                styles.middleContainer,
                {
                  paddingLeft:
                    this.props.title ===
                    localeString(LOCALE_STRING.HOME_OWNERSHIP.MY_HOME)
                      ? STYLE_CONSTANTS.margin.LARGER
                      : 0,
                },
              ]}>
              {this.props.title}
            </Text>
          </View>
        )}
        {rightIconPresent && iconName ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(iconPath)}
            style={iconStyle}>
            <Image
              source={iconName}
              height={STYLE_CONSTANTS.margin.HUMONGOUS}
              width={STYLE_CONSTANTS.margin.HUMONGOUS}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: STYLE_CONSTANTS.margin.HUMONGOUS,
              height: STYLE_CONSTANTS.margin.HUMONGOUS,
            }}
          />
        )}
      </View>
    );
  }
}

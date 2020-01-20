import {Dimensions, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters/extend';

export const STYLE_CONSTANTS = {
  device: {
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    SCREEN_WIDTH: Dimensions.get('screen').width,
    WINDOW_HEIGHT: Dimensions.get('window').height,
    WINDOW_WIDTH: Dimensions.get('window').width,
    DEVICE_TYPE_ANDROID: 'Android',
    DEVICE_TYPE_IOS: 'IOS',
    MAX_WIDTH: '100%',
  },
  elevation: {
    BASIC: verticalScale(5),
  },
  margin: {
    EXTRA_HUMUNGOUS: verticalScale(52),
    SLIGHT_HUMUNGOUS: verticalScale(48),
    HUMONGOUS: verticalScale(40),
    HUGE: verticalScale(36),
    HUGER: verticalScale(32),
    HUGISH: verticalScale(28),
    LARGER: verticalScale(24),
    LARGE: verticalScale(22),
    LARGEST: verticalScale(20),
    LARGISH: verticalScale(18),
    NORMAL: verticalScale(16),
    SMALL: verticalScale(12),
    SMALLISH: verticalScale(10),
    SMALLER: verticalScale(8),
    SMALLEST: verticalScale(4),
  },
  padding: {
    HUMONGOUS: verticalScale(44),
    HUGE: verticalScale(32),
    HUGISH: verticalScale(28),
    LARGER: verticalScale(24),
    LARGE: verticalScale(22),
    LARGEST: verticalScale(20),
    LARGISH: verticalScale(18),
    NORMAL: verticalScale(16),
    BELOW_NORMAL: verticalScale(14),
    SMALL: verticalScale(12),
    SMALLISH: verticalScale(10),
    SMALLER: verticalScale(8),
    ABOVE_SMALLEST: verticalScale(6),
    SMALLEST: verticalScale(4),
  },
  font: {
    SIZE: {
      LARGEST_HUMONGOUS: verticalScale(52),
      HUMONGOUS: verticalScale(48),
      HUGEST: verticalScale(36),
      HUGER: verticalScale(28),
      HUGE: verticalScale(24),
      HUGISH: verticalScale(22),
      LARGEST: verticalScale(20),
      LARGER: verticalScale(18),
      LARGE: verticalScale(16),
      LARGISH: verticalScale(15),
      NORMAL: verticalScale(14),
      SMALL: verticalScale(12),
      SMALLER: verticalScale(11),
      TINY: verticalScale(10),
    },
    LINEHEIGHT: {
      LARGEST_HUMONGOUS: verticalScale(76),
      HUMONGOUS: verticalScale(48),
      HUGEST: verticalScale(36),
      HUGER: verticalScale(28),
      HUGE: verticalScale(24),
      HUGISH: verticalScale(22),
      LARGER: verticalScale(20),
      LARGISH: verticalScale(18),
      LARGE: verticalScale(16),
      NORMAL: verticalScale(14),
      SMALL: verticalScale(12),
      SMALLER: verticalScale(11),
    },
    WEIGHT: {
      NORMAL: 'normal',
      SEMI_BOLD: '600',
      BOLD: '900',
    },
  },
  border: {
    WIDTH: {
      LIGHTER: StyleSheet.hairlineWidth, // lighter:0.125,
      LIGHT: StyleSheet.hairlineWidth, // light:0.25,
      NORMAL: StyleSheet.hairlineWidth * 2, // normal:0.5,
      HEAVY: 1, // heavy:1.0,
      HEAVIER: 2, // heavier:1.5,
      HEAVIEST: 3, // heaviest:3,
    },
    BORDER_RADIUS: {
      TINY: verticalScale(5),
      SMALLER: verticalScale(8),
    },
  },
  SPLASH_DIMENSION: {
    height: verticalScale(74),
    width: verticalScale(222),
  },
  IMAGE_RESIZE_CONFIG: {
    AUTO: 'auto',
    STRETCH: 'stretch',
    CONTAIN: 'contain',
  },
};

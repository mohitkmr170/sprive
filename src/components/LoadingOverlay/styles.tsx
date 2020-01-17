import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';
import {verticalScale} from 'react-native-size-matters/extend';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
  },
  textStyle: {
    color: COLOR.PRIMARY,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: STYLE_CONSTANTS.margin.LARGER,
  },
  spriveLoadingGif: {
    height: 5 * verticalScale(STYLE_CONSTANTS.padding.LARGEST),
    width: 5 * verticalScale(STYLE_CONSTANTS.padding.LARGEST),
  },
});

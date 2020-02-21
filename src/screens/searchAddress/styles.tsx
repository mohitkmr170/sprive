import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginVertical: STYLE_CONSTANTS.margin.HUGISH,
  },
  noAddressFoundText: {
    textAlign: 'center',
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  flatListContainer: {
    borderRadius: STYLE_CONSTANTS.padding.SMALLEST,
  },
  inputStyle: {
    marginLeft: STYLE_CONSTANTS.margin.NORMAL,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  leftIconContainer: {
    paddingVertical: STYLE_CONSTANTS.padding.SMALLEST,
  },
  inputContainerStyle: {
    borderBottomColor: COLOR.LIGHT_BORDER_LEAST_OPACITY,
    borderBottomWidth: 1,
  },
  containerStyle: {
    backgroundColor: COLOR.MILD_BACKGROUND_BLACK,
    borderRadius: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
  },
  listContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
  },
  addressText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
  },
});

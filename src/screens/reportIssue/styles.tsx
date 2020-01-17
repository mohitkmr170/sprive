import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 28,
  },
  buttonTitle: {
    color: COLOR.WHITE,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 40,
    marginBottom: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    marginHorizontal: 30,
  },
  titleText: {
    fontSize: 24,
    lineHeight: 36,
    color: '#09245E',
    fontWeight: '600',
  },
  dropDownContainer: {backgroundColor: '#F7F8FA', marginTop: 36},
  dropDownItemText: {fontSize: 14, lineHeight: 22},
  descriptionTitle: {
    marginTop: 28,
    color: '#09245E',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  internalStyle: {
    borderBottomColor: 'transparent',
    marginHorizontal: 20,
  },
  descriptionTextFaded: {
    color: '#09245E4D',
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  descriptionInput: {
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 10,
    paddingVertical: 16,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    height: STYLE_CONSTANTS.device.WINDOW_HEIGHT / 5,
  },
  descriptionWarning: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    color: 'rgba(9, 36, 94, 0.3)',
  },
});

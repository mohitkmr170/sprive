import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  innerTitle: {
    color: '#09245E',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    paddingTop: 44,
  },
  innerText: {
    textAlign: 'center',
    paddingTop: 10,
    color: '#09245E',
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.5,
  },
  okPressButton: {
    color: 'rgba(221, 35, 113, 1)',
    paddingTop: 32,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});

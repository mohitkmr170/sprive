import {StyleSheet} from 'react-native';
import {appConstants} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row'},
  barChart: {
    height: appConstants.GRAPH_HEIGHT,
    backgroundColor: '#DEDFDF',
    borderBottomColor: '#BEC0C0',
    borderBottomWidth: 1,
  },
  monthView: {
    flexDirection: 'row',
    padding: 32,
    justifyContent: 'space-between',
    backgroundColor: '#DEDFDF',
  },
  monthDetails: {
    backgroundColor: '#BEC0C0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    width: '50%',
  },
  monthDetailsText: {color: '#7C7C7C', fontSize: 24},
  monthHeaderText: {
    fontSize: 14,
    color: '#908F8F',
    fontStyle: 'italic',
    paddingBottom: 4,
  },
});

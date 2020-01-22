import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR} from '../../utils';

const BULLET_SIZE = 10;
const INNER_VIEW_SIZE_DIFF = 2;

export class Bullets extends React.Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: BULLET_SIZE,
    width: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: BULLET_SIZE - INNER_VIEW_SIZE_DIFF,
    width: BULLET_SIZE - INNER_VIEW_SIZE_DIFF,
    borderRadius: (BULLET_SIZE - INNER_VIEW_SIZE_DIFF) / 2,
    borderColor: COLOR.DARK_YELLOW,
    borderWidth: INNER_VIEW_SIZE_DIFF,
    backgroundColor: COLOR.LIGHT_YELLOW,
  },
});

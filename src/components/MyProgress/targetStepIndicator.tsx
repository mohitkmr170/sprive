import React from 'react';
import {View, Text, Image} from 'react-native';
import {localeString, STYLE_CONSTANTS, LOCALE_STRING} from '../../utils';
import {styles} from './styles';
import {iPointer} from '../../assets';

interface props {}

interface state {
  targetYearPosition: number;
  projectedYearPosition: number;
}

export class TargetStepIndicator extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      targetYearPosition: 0,
      projectedYearPosition: 0,
    };
  }
  componentDidMount() {
    let startYear = new Date().getFullYear();
    let targetYear = 2025;
    let projectedYear = 2027;
    let endYear = projectedYear + 8;
    const steps = endYear - startYear;
    const stepFactor =
      (STYLE_CONSTANTS.device.SCREEN_WIDTH - 4 * STYLE_CONSTANTS.margin.LARGE) /
      steps;
    const targetYearPosition = stepFactor * (targetYear - startYear);
    const projectedYearPosition = stepFactor * (projectedYear - startYear);
    this.setState({
      targetYearPosition: targetYearPosition,
      projectedYearPosition: projectedYearPosition,
    });
  }
  render() {
    return (
      <View style={styles.mainContainerStepIndicator}>
        <View style={styles.circularView} />
        <View style={styles.startPointContainer}>
          <Text style={styles.startDate}>
            {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.TODAY)}
          </Text>
        </View>
        <View style={styles.trackStyle}>
          <View
            style={[
              styles.targetContainer,
              {left: this.state.targetYearPosition},
            ]}>
            <Image
              source={iPointer}
              style={styles.pointerStyle}
              resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
            />
            <View>
              <Text style={styles.targetText}>
                {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.TARGET)}
              </Text>
              <Text style={styles.targetDateStyle}>Apr 2025</Text>
            </View>
          </View>
          <View
            style={[
              styles.projectedContainer,
              {left: this.state.projectedYearPosition},
            ]}>
            <View>
              <Text style={styles.targetText}>
                {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.PROJECTED)}
              </Text>
              <Text style={styles.targetDateStyle}>June 2027</Text>
            </View>
            <Image
              source={iPointer}
              resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
              style={[{transform: [{rotate: '180deg'}]}, styles.pointerStyle]}
            />
          </View>
        </View>
        <View style={styles.circularView} />
        <View style={styles.endPointContainer}>
          <Text style={styles.startDate}>2035</Text>
        </View>
      </View>
    );
  }
}

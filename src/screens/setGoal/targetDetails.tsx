import React from 'react';
import {View, Text, Image} from 'react-native';
import {getNumberWithCommas, localeString, LOCALE_STRING} from '../../utils';
import {styles} from './styles';

interface props {
  monthlyOverPayment: number;
  interestSaving: number;
}

interface state {}

export class TargetDetails extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {monthlyOverPayment, interestSaving} = this.props;
    const monthlyOverPaymentWithCommas = getNumberWithCommas(
      String(monthlyOverPayment),
    );
    const interestSavingWithCommas = getNumberWithCommas(
      String(interestSaving),
    );
    return (
      <View>
        <Text style={styles.detailText}>
          {localeString(LOCALE_STRING.SET_GOAL_SCREEN.YOU_CAN_ADJUST)}
        </Text>
        <Text style={styles.basedOnText}>
          {localeString(LOCALE_STRING.SET_GOAL_SCREEN.BASED_ON_TARGET)}
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.bottonContainerInner}>
            <View style={styles.leftContainer}>
              <Text style={styles.leftText}>
                {localeString(LOCALE_STRING.SET_GOAL_SCREEN.ESTIMATE)}
              </Text>
              <Text style={styles.leftText}>
                {localeString(LOCALE_STRING.SET_GOAL_SCREEN.OVER_PAYMENT)}
              </Text>
              <Text style={styles.leftDetails}>
                £{monthlyOverPaymentWithCommas}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.leftText}>
                {' '}
                {localeString(LOCALE_STRING.SET_GOAL_SCREEN.ESTIMATE_INTEREST)}
              </Text>
              <Text style={styles.leftText}>
                {localeString(LOCALE_STRING.SET_GOAL_SCREEN.SAVINGS)}
              </Text>
              <Text style={styles.leftDetails}>
                £{interestSavingWithCommas}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

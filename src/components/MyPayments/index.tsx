import React from 'react';
import {View, Text} from 'react-native';
import {StackBarGraph} from '../../components';
import {styles} from './styles';
import {localeString, LOCALE_STRING} from '../../utils';

interface props {
  currentMonthTarget: any;
}

interface state {}

export class MyPayments extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {currentMonthTarget} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.myPaymentsText}>
          {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.MY_PAYMENTS)}
        </Text>
        <StackBarGraph currentMonthTarget={currentMonthTarget} />
      </View>
    );
  }
}

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
interface props {
  title: number;
  monthlyTarget: number;
}
interface state {}

export class AmountContainer extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {title, monthlyTarget} = this.props;
    return (
      <View style={styles.amountCardContainer}>
        <Text style={styles.amountCardTitleText}>{title}</Text>
        <Text style={styles.amountCardValue}>£ {monthlyTarget}</Text>
      </View>
    );
  }
}

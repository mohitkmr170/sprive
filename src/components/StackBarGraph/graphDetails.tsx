import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface props {
  title: string;
  color: string;
}
interface state {}

export class GraphDetails extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {title, color} = this.props;
    return (
      <View style={styles.topContainer}>
        <View
          style={[
            styles.mainConatiner,
            {backgroundColor: color, borderColor: color},
          ]}
        />
        <Text>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {flexDirection: 'row'},
  mainConatiner: {
    height: 5,
    width: 5,
    borderWidth: 1,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginRight: 5,
  },
});

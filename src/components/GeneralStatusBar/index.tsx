import React from 'react';
import {View, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface props {
  backgroundColor: string;
}
interface state {}
export class GeneralStatusBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }
  render() {
    const {backgroundColor} = this.props;
    return (
      <View
        style={{
          height: getStatusBarHeight(),
          backgroundColor: backgroundColor,
        }}>
        <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      </View>
    );
  }
}

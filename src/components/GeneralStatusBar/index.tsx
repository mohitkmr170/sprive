import React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLOR} from '../../utils';

interface props {
  backgroundColor: string;
  barStyle: string;
}
interface state {}
export class GeneralStatusBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }
  render() {
    console.log('Changes on GeneralStatusBar', this.props);
    const {backgroundColor, barStyle} = this.props;
    return (
      <View
        style={{
          height: Platform.OS === 'android' ? 0 : getStatusBarHeight(),
          backgroundColor: backgroundColor ? backgroundColor : COLOR.WHITE,
        }}>
        <StatusBar barStyle={barStyle ? barStyle : 'dark-content'} />
      </View>
    );
  }
}

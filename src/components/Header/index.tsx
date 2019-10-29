import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLOR} from '../../utils/colors';
import {localeString} from '../../utils/i18n';

interface props {
  title: String;
  onBackPress: () => void;
}
interface state {}

export class Header extends React.Component<props, state> {
  render() {
    return (
      <View
        style={{
          padding: 16,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomColor: COLOR.black,
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <Text style={{alignSelf: 'center'}}>
            {localeString('global.backButton')}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
          }}>
          {this.props.title}
        </Text>
        <Text style={{alignSelf: 'center'}}>Icon</Text>
      </View>
    );
  }
}

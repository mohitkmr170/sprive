import React from 'react';
import {View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLOR} from '../../utils/colors';

export class ToolTip extends React.Component {
  render() {
    return (
      <Animatable.View
        animation="fadeIn"
        easing="ease-in-circ"
        duration={200}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          backgroundColor: COLOR.WHITE,
          borderRadius: 4,
          paddingHorizontal: 18,
          paddingVertical: 8,
          shadowColor: 'gray',
          shadowOffset: {height: 4, width: 4},
          shadowOpacity: 4,
          shadowRadius: 4,
        }}>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 24,
            color: '#09245E',
            opacity: 0.5,
            fontWeight: '500',
          }}>
          Overpayment <Text style={{color: '#FF9D00'}}>£75</Text>
          <Text style={{color: '#0000004D'}}>/£175</Text>
        </Text>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 24,
            color: '#09245E',
            opacity: 0.5,
            paddingTop: 4,
            fontWeight: '500',
          }}>
          Fixed Payment <Text style={{color: '#22319B'}}>£175</Text>
        </Text>
      </Animatable.View>
    );
  }
}

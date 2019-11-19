import React from 'react';
import {View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLOR} from '../../utils/colors';
import {get as _get} from 'lodash';

interface props {
  info: object;
}
interface state {}
export class ToolTip extends React.Component<props, state> {
  render() {
    const overPayment = Math.round(Number(this.props.info.overPayment));
    const monthlyTarget = Math.round(Number(this.props.info.monthlyTarget));
    const monthlyMortgage = Math.round(
      Number(this.props.info.monthly_mortgage),
    );
    const svgMonthlyMortgage = this.props.info.svgColor;
    console.log('asdkjhasdas', svgMonthlyMortgage);
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
          borderColor: COLOR.GRAY,
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
          Overpayment{' '}
          <Text
            style={{
              color:
                svgMonthlyMortgage === '#D3D6EB'
                  ? '#0000004D'
                  : overPayment >= monthlyTarget
                  ? COLOR.SLIDER_COLOR
                  : COLOR.DARK_YELLOW,
            }}>
            £ {overPayment}
          </Text>
          <Text style={{color: '#0000004D'}}>/£ {monthlyTarget}</Text>
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
          Fixed Payment{' '}
          <Text style={{color: '#22319B'}}>£ {monthlyMortgage}</Text>
        </Text>
      </Animatable.View>
    );
  }
}

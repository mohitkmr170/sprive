import React from 'react';
import {Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  localeString,
  getNumberWithCommas,
  COLOR,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils';
import {get as _get} from 'lodash';

interface props {
  info: {
    overPayment: number;
    monthlyTarget: number;
    monthly_mortgage: number;
    svgColor: string;
  };
}
interface state {}
export class ToolTip extends React.Component<props, state> {
  render() {
    const overPayment = Math.round(Number(this.props.info.overPayment));
    const monthlyTarget = Math.round(Number(this.props.info.monthlyTarget));
    console.log('monthlyTarget', monthlyTarget);
    const monthlyMortgage = Math.round(
      Number(this.props.info.monthly_mortgage),
    );

    const overPaymentWithCommas = getNumberWithCommas(overPayment);
    const monthlyTargetWithCommas = getNumberWithCommas(monthlyTarget);
    const monthlyMortgageWithCommas = getNumberWithCommas(monthlyMortgage);
    const svgMonthlyMortgage = this.props.info.svgColor;
    return (
      <Animatable.View
        animation="fadeIn"
        easing="ease-in-circ"
        duration={200}
        style={styles.mainContainer}>
        <Text style={styles.overPaymentText}>
          {localeString(LOCALE_STRING.SET_GOAL_SCREEN.OVER_PAYMENT)}{' '}
          <Text
            style={{
              color:
                svgMonthlyMortgage === COLOR.STEEL_GRAY
                  ? COLOR.REDUX_FORM_INPUT_CONTAINER
                  : overPayment >= monthlyTarget
                  ? COLOR.SLIDER_COLOR
                  : COLOR.DARK_YELLOW,
            }}>
            £{overPaymentWithCommas}
          </Text>
          <Text style={styles.monthlyTargetText}>
            /£
            {monthlyTargetWithCommas}
          </Text>
        </Text>
        <Text style={styles.fixesPaymentText}>
          Fixed Payment{' '}
          <Text style={{color: COLOR.DARK_BLUE}}>
            £{monthlyMortgageWithCommas}
          </Text>
        </Text>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.GRAY,
    borderRadius: STYLE_CONSTANTS.padding.SMALLEST,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGISH,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLER,
    shadowColor: COLOR.GRAY,
    elevation: STYLE_CONSTANTS.elevation.BASIC,
    shadowOffset: {
      height: STYLE_CONSTANTS.padding.SMALLEST,
      width: STYLE_CONSTANTS.padding.SMALLEST,
    },
    shadowOpacity: STYLE_CONSTANTS.padding.SMALLEST,
    shadowRadius: STYLE_CONSTANTS.padding.SMALLEST,
  },
  overPaymentText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  monthlyTargetText: {color: COLOR.REDUX_FORM_INPUT_CONTAINER},
  fixesPaymentText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});

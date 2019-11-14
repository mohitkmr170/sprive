import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header} from '../../components';
import Slider from '@react-native-community/slider';
import {localeString} from '../../utils/i18n';
import {LOCALE_STRING} from '../../utils/constants';
import {COLOR} from '../../utils/colors';

const YEAR_MIN_LIMIT = 8;
const SLIDER_START_VALUE = 0;
const SLIDER_END_VALUE = 20;
const SLIDER_STEP = 1;

interface props {}
interface state {
  yearTarget: number;
}
export class SetGoal extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      yearTarget: 0,
    };
  }

  componentWillMount() {
    this.setState({yearTarget: YEAR_MIN_LIMIT});
  }

  /**
   * Function called upon slider being changed
   * @param newValue : number : updated value of slider
   */
  onSlide = (newValue: number) => {
    this.setState({yearTarget: newValue});
  };

  /**
   * Function to be called on setGoal button press
   */
  handleSetGoal = () => {};

  render() {
    const {yearTarget} = this.state;
    return (
      <View style={styles.mainContainer}>
        <Header />
        <ScrollView contentContainerStyle={styles.middleContainer}>
          <View style={styles.mortgageStatusProgressContainer}>
            <Text style={styles.mortgageTextData}>
              {localeString(
                LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_MORTGAGE_DATA,
              )}
            </Text>
            <Text style={styles.progressFractionText}>4/4</Text>
          </View>
          <Text style={styles.mainHeaderText}>
            {localeString(LOCALE_STRING.SET_GOAL_SCREEN.HOW_QUICKLY)}
          </Text>
          <View style={styles.targetTextContainer}>
            <Text style={styles.setTargetText}>
              {localeString(LOCALE_STRING.SET_GOAL_SCREEN.SET_TARGET)}
            </Text>
            <Text style={styles.currentYearText}>{yearTarget}</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLeftText}>{SLIDER_START_VALUE}</Text>
            <Slider
              style={styles.sliderInternalStyles}
              minimumValue={SLIDER_START_VALUE}
              maximumValue={SLIDER_END_VALUE}
              step={SLIDER_STEP}
              value={yearTarget}
              onValueChange={newValue => this.onSlide(newValue)}
              thumbTintColor={COLOR.SLIDER_COLOR}
              minimumTrackTintColor={COLOR.BLACK}
              maximumTrackTintColor={COLOR.BLACK}
            />
            <Text style={styles.sliderLeftText}>{SLIDER_END_VALUE}</Text>
          </View>
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
                  3 {localeString(LOCALE_STRING.SET_GOAL_SCREEN.MONTHS)}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.leftText}>
                  {' '}
                  {localeString(
                    LOCALE_STRING.SET_GOAL_SCREEN.ESTIMATE_INTEREST,
                  )}
                </Text>
                <Text style={styles.leftText}>
                  {localeString(LOCALE_STRING.SET_GOAL_SCREEN.SAVINGS)}
                </Text>
                <Text style={styles.leftDetails}>£ 175</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Button
          title={localeString(LOCALE_STRING.SET_GOAL_SCREEN.SET_GOAL)}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => this.handleSetGoal()}
        />
      </View>
    );
  }
}

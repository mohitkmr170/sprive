import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import * as Progress from 'react-native-progress';
import {iPadLocks} from '../../assets';
import {ProjectedDataContainer} from '../StackBarGraph/projectedDataContainer';
import {
  getLtvRangeAndPercentage,
  COLOR,
  APP_CONSTANTS,
  STYLE_CONSTANTS,
  localeString,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {get as _get} from 'lodash';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {TargetStepIndicator} from './targetStepIndicator';

const CURRENT_LTV = 61;
interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
}

interface state {
  isCheaperDealSelected: boolean;
  isMortgageSelected: boolean;
}

const BLOCK_GRADIENT = [COLOR.WHITE, COLOR.GRADIENT_PRIMARY];

export class MyProgress extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isCheaperDealSelected: false,
      isMortgageSelected: true,
    };
  }

  componentDidMount() {}

  handleCheaperDealsClick = () => {
    this.setState({isCheaperDealSelected: true, isMortgageSelected: false});
  };

  handleMortgageClick = () => {
    this.setState({isCheaperDealSelected: false, isMortgageSelected: true});
  };

  hanldeCompleteYourProfileClick = () => {
    /*
    TODO : Need to check where to route based on stage-completion of `user-profile` task
    */
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_PROFILE);
  };

  render() {
    const {isCheaperDealSelected, isMortgageSelected} = this.state;
    return (
      <Animatable.View
        animation="fadeIn"
        duration={300}
        style={styles.mainContainer}>
        <Text style={styles.myProgressText}>
          {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.MY_PRGRESS)}
        </Text>
        <View style={styles.tabSelectionButtonContainer}>
          <TouchableOpacity
            hitSlop={APP_CONSTANTS.HIT_SLOP}
            onPress={() => this.handleMortgageClick()}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: isMortgageSelected
                  ? COLOR.WHITE
                  : COLOR.GHOST_WHITE,
              },
            ]}>
            <Text
              style={[
                styles.selectorButtonText,
                {
                  color: isMortgageSelected ? COLOR.PRIMARY : COLOR.BLACK,
                  fontWeight: isMortgageSelected
                    ? STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD
                    : 'normal',
                },
              ]}>
              {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.MORTGAGE)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={APP_CONSTANTS.HIT_SLOP}
            onPress={() => this.handleCheaperDealsClick()}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: isCheaperDealSelected
                  ? COLOR.WHITE
                  : COLOR.GHOST_WHITE,
              },
            ]}>
            <Text
              style={[
                styles.selectorButtonText,
                {
                  color: isCheaperDealSelected ? COLOR.PRIMARY : COLOR.BLACK,
                  fontWeight: isCheaperDealSelected
                    ? STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD
                    : 'normal',
                },
              ]}>
              {localeString(
                LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.CHEAPER_DEALS,
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {isCheaperDealSelected && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.hanldeCompleteYourProfileClick()}
            style={styles.blockedViewContainer}>
            <Animatable.View style={{flex: 1}} animation="fadeIn">
              <LinearGradient
                colors={BLOCK_GRADIENT}
                style={styles.blockedInnerContainer}>
                <Image source={iPadLocks} style={{opacity: 1}} />
                <Text style={styles.completeYourProfileText}>
                  {localeString(
                    LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS
                      .COMPLETE_YOUR_PROFILE,
                  )}
                </Text>
              </LinearGradient>
            </Animatable.View>
          </TouchableOpacity>
        )}
        {isMortgageSelected ? (
          <TargetStepIndicator />
        ) : (
          <Animatable.View animation="fadeIn" duration={300}>
            <Text style={styles.currentLtvText}>
              {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.CURRENT_LTV)}
            </Text>
            <View style={styles.progressBarContainer}>
              <Text style={styles.percentageText}>
                {_get(getLtvRangeAndPercentage(CURRENT_LTV), 'startVal', '')}
              </Text>
              <View style={styles.progressContainer}>
                <Progress.Bar
                  progress={_get(
                    getLtvRangeAndPercentage(CURRENT_LTV),
                    'percentage',
                    0,
                  )}
                  color={COLOR.DARKEST_YELLOW}
                  height={10}
                  width={null}
                  borderRadius={5}
                  unfilledColor={COLOR.LIGHTEST_YELLOW}
                  borderWidth={0}
                />
              </View>
              <Text style={styles.percentageText}>
                {_get(getLtvRangeAndPercentage(CURRENT_LTV), 'endVal', '')}
              </Text>
            </View>
            <Text style={styles.unlockbetterDealsText}>
              {localeString(
                LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.UNLOCK_DEALS,
              )}
            </Text>
          </Animatable.View>
        )}
        <View>
          <ProjectedDataContainer />
        </View>
      </Animatable.View>
    );
  }
}

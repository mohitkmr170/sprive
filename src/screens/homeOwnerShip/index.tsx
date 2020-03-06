import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import {Svg, Circle, Line} from 'react-native-svg';
import {styles} from './styles';
import {chatIcon, homeOwnership, iPadLocks} from '../../assets';
import {GeneralStatusBar, Header} from '../../components';
import {
  localeString,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
  COLOR,
} from '../../utils';

const BLOCK_GRADIENT = [COLOR.WHITE, COLOR.PRIMARY_THIRD_PART];
interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
}
interface state {}

export class HomeOwnerShip extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  hanldeCompleteYourProfileClick = () => {};
  render() {
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.HOME_OWNERSHIP.HOME_OWNERSHIP)}
          rightIconPresent
          iconName={chatIcon}
          iconPath={NAVIGATION_SCREEN_NAME.REPORT_ISSUE}
          navigation={this.props.navigation}
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.nonHeaderContainer}>
          <ScrollView contentContainerStyle={styles.scrollableMainContainer}>
            <View style={styles.innerMainContainer}>
              <View style={styles.startPointDot} />
              <AnimatedCircularProgress
                size={
                  STYLE_CONSTANTS.device.SCREEN_WIDTH -
                  2 * STYLE_CONSTANTS.margin.HUMONGOUS
                }
                width={STYLE_CONSTANTS.margin.LARGISH} //Width of stroke
                fill={20} //Progress percent to be filled
                tintColor={COLOR.CARIBBEAN_GREEN}
                backgroundWidth={STYLE_CONSTANTS.margin.SMALLEST / 2}
                rotation={0} //Starting point of progress
                dashedBackground={{width: 10, gap: 12}}
                backgroundColor={COLOR.CARIBBEAN_GREEN_ONE_THIRD}
                renderCap={({center}) => (
                  <Circle
                    cx={center.x}
                    cy={center.y}
                    r={STYLE_CONSTANTS.margin.SMALL}
                    fill={COLOR.CARIBBEAN_GREEN}
                  />
                )}
                lineCap="butt">
                {() => <Image source={homeOwnership} />}
              </AnimatedCircularProgress>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.ownedPercentageContainer} />
              <Svg height="80" width="80" style={styles.svgLineStyle}>
                <Line
                  /*
                  NOTES : Plotting values
                  */
                  x1="0"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke={COLOR.VOILET_ONE_THIRD}
                  strokeDasharray="8, 8"
                  strokeWidth="2"
                />
              </Svg>
              <Text style={styles.percentageText}>20%</Text>
              <Svg height="80" width="80">
                <Line
                  /*
                  NOTES : Plotting values
                  */
                  x1="16"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke={COLOR.VOILET_ONE_THIRD}
                  strokeDasharray="8, 8"
                  strokeWidth="2"
                />
              </Svg>
              <Text style={styles.dateText}>Jun 27’</Text>
            </View>
            <Text style={styles.myHouseText}>
              {localeString(LOCALE_STRING.HOME_OWNERSHIP.OF_MY_HOUSE)}
            </Text>
            <View style={styles.loadToValueContainer}>
              <Text style={styles.loanToValueText}>
                {localeString(LOCALE_STRING.HOME_OWNERSHIP.LOAN_TO_VALUE)}
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarInnerContainer}>
                  <Progress.Bar
                    progress={0.8}
                    color={COLOR.DARK_YELLOW}
                    height={STYLE_CONSTANTS.margin.SMALLISH}
                    width={null}
                    unfilledColor={COLOR.LIGHTEST_YELLOW}
                    borderWidth={0}
                  />
                </View>
                <Text style={styles.ltvPercentageText}>80%</Text>
              </View>
              <Text style={styles.unlockCheaperDealsText}>
                {localeString(LOCALE_STRING.HOME_OWNERSHIP.UNLOCK_PERCENTAGE, {
                  percent: 75,
                })}
              </Text>
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountOwnerContainer}>
                <Text style={styles.amountOwnedText}>
                  {localeString(LOCALE_STRING.HOME_OWNERSHIP.AMOUNT_OWNED)}
                </Text>
                <Text style={styles.amountText}>£125,000</Text>
              </View>
              <View style={styles.estimatedValueContainer}>
                <Text style={styles.amountOwnedText}>
                  {localeString(LOCALE_STRING.HOME_OWNERSHIP.ESTIMATED_VALUE)}
                </Text>
                <Text style={styles.amountText}>£625,000</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.hanldeCompleteYourProfileClick()}
            style={styles.blockedViewContainer}>
            <LinearGradient
              colors={BLOCK_GRADIENT}
              style={styles.blockedInnerContainer}>
              <Image source={iPadLocks} style={{opacity: 1}} />
              <Text style={styles.completeYourProfileText}>
                {localeString(
                  LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.COMPLETE_YOUR_PROFILE,
                )}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

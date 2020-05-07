import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from './styles';
import {
  zeroComplete,
  twentyComplete,
  fourtyComplete,
  sixtyComplete,
  eightyComplete,
  hundredComplete,
} from '../../assets';
import {
  localeString,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  COLOR,
  DB_KEYS,
  APP_CONSTANTS,
} from '../../utils';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {get as _get} from 'lodash';
import {
  Svg,
  Circle,
  Line,
  Image as SvgImage,
  Text as SvgText,
} from 'react-native-svg';

const totalAngleCovered = 360;
const totalPercentageOwned = 100;

interface props {
  houseOwned: number;
  targetMonth: any;
  targetYear: any;
  getUserMortgageDataResponse: object;
}

interface state {}

export class AnimatedCircularProgressBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  getHomeownershipImage = () => {
    const {getUserMortgageDataResponse} = this.props;
    const currentLtv = Math.round(
      _get(getUserMortgageDataResponse, DB_KEYS.LTV, 0),
    );
    const houseOwned = 100 - (currentLtv ? currentLtv : 0);
    if (
      houseOwned >= APP_CONSTANTS.HOME_OWNERSHIP_RANGES.ZERO &&
      houseOwned < APP_CONSTANTS.HOME_OWNERSHIP_RANGES.TWENTY
    )
      return <Image style={styles.centerImage} source={zeroComplete} />;
    else if (
      houseOwned >= APP_CONSTANTS.HOME_OWNERSHIP_RANGES.TWENTY &&
      houseOwned < APP_CONSTANTS.HOME_OWNERSHIP_RANGES.FOURTY
    )
      return <Image style={styles.centerImage} source={twentyComplete} />;
    else if (
      houseOwned >= APP_CONSTANTS.HOME_OWNERSHIP_RANGES.FOURTY &&
      houseOwned < APP_CONSTANTS.HOME_OWNERSHIP_RANGES.SIXTY
    )
      return <Image style={styles.centerImage} source={fourtyComplete} />;
    else if (
      houseOwned >= APP_CONSTANTS.HOME_OWNERSHIP_RANGES.SIXTY &&
      houseOwned < APP_CONSTANTS.HOME_OWNERSHIP_RANGES.EIGHTY
    )
      return <Image style={styles.centerImage} source={sixtyComplete} />;
    else if (
      houseOwned >= APP_CONSTANTS.HOME_OWNERSHIP_RANGES.EIGHTY &&
      houseOwned < APP_CONSTANTS.HOME_OWNERSHIP_RANGES.HUNDRED
    )
      return <Image style={styles.centerImage} source={eightyComplete} />;
    else if (houseOwned === APP_CONSTANTS.HOME_OWNERSHIP_RANGES.HUNDRED)
      return <Image style={styles.centerImage} source={hundredComplete} />;
    else return;
  };
  getRotationAngle = (houseOwned: number) => {
    let angle = (totalAngleCovered / totalPercentageOwned) * houseOwned;
    return angle;
  };

  render() {
    const {houseOwned, targetMonth, targetYear} = this.props;
    return (
      <View style={styles.scrollableMainContainer}>
        <View style={styles.innerMainContainer}>
          <View style={styles.startPointDot} />
          <AnimatedCircularProgress
            size={
              STYLE_CONSTANTS.device.SCREEN_WIDTH -
              2 * STYLE_CONSTANTS.margin.HUMONGOUS
            }
            width={STYLE_CONSTANTS.margin.LARGISH} //Width of stroke
            fill={houseOwned} //Progress percent to be filled
            tintColor={COLOR.CARIBBEAN_GREEN}
            backgroundWidth={STYLE_CONSTANTS.margin.SMALLEST / 2}
            rotation={0} //Starting point of progress
            dashedBackground={{width: 10, gap: 12}}
            backgroundColor={COLOR.CARIBBEAN_GREEN_ONE_THIRD}
            padding={STYLE_CONSTANTS.margin.SMALLER}
            renderCap={({center}) => (
              <Svg
                height={STYLE_CONSTANTS.device.SCREEN_HEIGHT}
                width={STYLE_CONSTANTS.device.SCREEN_WIDTH}>
                <Circle
                  cx={center.x}
                  cy={center.y}
                  r={STYLE_CONSTANTS.margin.SMALL}
                  fill={COLOR.CARIBBEAN_GREEN}
                />
                <SvgText
                  x={center.x}
                  y={center.y + STYLE_CONSTANTS.margin.SMALLEST}
                  fill={COLOR.WHITE}
                  fontSize={STYLE_CONSTANTS.font.SIZE.LARGE}
                  fontWeight="600"
                  textAnchor="middle"
                  transform={{
                    rotation: this.getRotationAngle(houseOwned),
                    originX: center.x,
                    originY: center.y,
                  }}>
                  >
                </SvgText>
              </Svg>
            )}>
            {() => this.getHomeownershipImage()}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.svgLineContainer}>
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
          </View>
          <View>
            <Text
              style={[
                styles.percentageText,
                {paddingLeft: STYLE_CONSTANTS.padding.SMALL},
              ]}>
              {houseOwned}%
            </Text>
          </View>
          <View style={styles.svgLineContainer}>
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
            {/* This is to be tested */}
            <Text style={styles.dateText}>
              {targetMonth} {targetYear}’
            </Text>
          </View>
        </View>
        <Text style={styles.myHouseText}>
          {localeString(LOCALE_STRING.HOME_OWNERSHIP.OF_MY_HOUSE)}
        </Text>
      </View>
    );
  }
}

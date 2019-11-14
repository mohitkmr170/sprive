import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';
import {styles} from './styles';
import {GraphDetails} from './graphDetails';
import {
  APP_CONSTANTS,
  STYLE_CONSTANTS,
  ICON_NAME,
  LOCALE_STRING,
} from '../../utils/constants';
import Icons from 'react-native-vector-icons/Feather';
import {localeString} from '../../utils/i18n';
import {COLOR} from '../../utils/colors';

let TOTAL_PAYMENT_FOR_THE_MONTH = 300;
let emi = 200;
const FIXED_PAYMENT = 'Fixed Payment';
const OVER_PAYMENT = 'Overpayment';
const TARGET_MET = 'Target Met';
//Number of data to be shown along x-axis(bar count)
const GRAPH_OFFSET = 6;
const GRAPH_DATA = [
  //Mock data for graph
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => Alert.alert('onPress => clicked bar1'),
      },
    },
    overPayment: {
      value: 400,
      svg: {
        onPress: () => Alert.alert('onPress => clicked bar2'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 250,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 200,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 200,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 250,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 200,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 200,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 250,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 200,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: true,
  },
  {
    emi: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    overPayment: {
      value: 300,
      svg: {
        onPress: () => console.log('onPress => clicked bar'),
      },
    },
    status: false,
  },
];

const COLORS = [COLOR.DARK_BLUE, COLOR.DARK_YELLOW];
const KEYS = ['emi', 'overPayment'];
interface props {}

interface state {
  currentScrollIndex: number;
  isLeftButtonActive: boolean;
  isRightButtonActive: boolean;
}

// Sample test data used for graph plotting

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let currentMonth = MONTH_NAMES[new Date().getMonth()];

export class StackBarGraph extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScrollIndex: 0,
      isLeftButtonActive: false,
      isRightButtonActive: true,
    };
  }

  componentWillMount = () => {
    if (currentMonth > String(GRAPH_OFFSET))
      this.setState({currentScrollIndex: 1});
  };

  /**
   * This function is to decrement currentScrollIndex by 1 upon left click
   */

  handleGraphLeftSwipe = () => {
    if (this.state.currentScrollIndex)
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex - 1,
        isRightButtonActive: !this.state.isRightButtonActive,
        isLeftButtonActive: !this.state.isLeftButtonActive,
      });
  };

  /**
   * This function is to Increment currentScrollIndex by 1 upon right click
   */

  handleGraphRightSwipe = () => {
    if (this.state.currentScrollIndex < MONTH_NAMES.length / GRAPH_OFFSET - 1)
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex + 1,
        isRightButtonActive: !this.state.isRightButtonActive,
        isLeftButtonActive: !this.state.isLeftButtonActive,
      });
  };

  render() {
    //Calculating current graph and month data to be rendered out of all available data
    let currData = GRAPH_DATA.slice(
      this.state.currentScrollIndex * GRAPH_OFFSET,
      GRAPH_OFFSET * (this.state.currentScrollIndex + 1),
    );
    let currMonthName = MONTH_NAMES.slice(
      this.state.currentScrollIndex * GRAPH_OFFSET,
      GRAPH_OFFSET * (this.state.currentScrollIndex + 1),
    );
    return (
      <View style={styles.mainTopContainer}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            disabled={this.state.isLeftButtonActive}
            onPress={() => this.handleGraphLeftSwipe()}
            style={styles.leftSwipeButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Icons
              name={ICON_NAME.LEFT_ICON}
              size={STYLE_CONSTANTS.margin.LARGER}
              color={
                this.state.isLeftButtonActive ? COLOR.LIGHT_GRAY : COLOR.BLACK
              }
            />
          </TouchableOpacity>
          <View style={styles.mainStackbarContainer}>
            <View>
              <StackedBarChart
                style={styles.barChart}
                /*
                TODO : Keys and Colors will change as per the payment status, it will then become a single bar graph
                */
                keys={KEYS}
                colors={COLORS}
                data={currData}
                showGrid={false}
                contentInset={styles.graphInnerSpacing}
                animate={true}
                spacingInner={0.85}
                valueAccessor={({item, key}) => item[key].value}
              />
            </View>
            <View style={styles.monthView}>
              {currMonthName.map((item, index) => {
                return (
                  <Text
                    style={[
                      styles.monthText,
                      {
                        color: currData[index].status
                          ? COLOR.SLIDER_COLOR
                          : COLOR.STEEL_GRAY,
                        textDecorationLine:
                          currentMonth === item && 'underline',
                      },
                    ]}
                    key={index}>
                    {item}
                  </Text>
                );
              })}
            </View>
            <View style={styles.graphDetails}>
              <GraphDetails title={FIXED_PAYMENT} color={COLOR.DARK_BLUE} />
              <GraphDetails title={OVER_PAYMENT} color={COLOR.DARK_YELLOW} />
              <GraphDetails title={TARGET_MET} color={COLOR.SLIDER_COLOR} />
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomLeftContainer}>
                <View>
                  <Text style={styles.projectedTimeText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.PROJECTED_TIME)}
                  </Text>
                  <Text style={styles.projectedTimeText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.SAVING)}
                  </Text>
                  <Text style={styles.numberOfMonthText}>
                    3{' '}
                    <Text style={styles.monthsText}>
                      {localeString(LOCALE_STRING.GRAPH_COMPONENT.MONTHS)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.bottomRightContainer}>
                <View>
                  <Text style={styles.projectedInterestText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.PROJECTED_INT)}
                  </Text>
                  <Text style={styles.savingText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.SAVING)}
                  </Text>
                  <Text style={styles.projectSavingText}>£ 175</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={this.state.isRightButtonActive}
            onPress={() => this.handleGraphRightSwipe()}
            style={styles.rightButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Icons
              name={ICON_NAME.RIGHT_ICON}
              size={STYLE_CONSTANTS.margin.LARGER}
              color={
                this.state.isRightButtonActive ? COLOR.LIGHT_GRAY : COLOR.BLACK
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

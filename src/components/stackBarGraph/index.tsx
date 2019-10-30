import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';
import {styles} from './styles';
import {appConstants} from '../../utils/constants';

const GRAPH_OFFSET = 6; //Number of data to be shown along x-axis(bar count)
let monthlyTarget = 300;
let emi = 200;
interface props {}

interface state {
  currentScrollIndex: number;
}

/**
 * Sample test data used for graph plotting
 */

let monthNames = [
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
let currentMonth = monthNames[new Date().getMonth()];
const data = [
  {
    emi: emi,
    overPayment: 300,
  },
  {
    emi: emi,
    overPayment: 370,
  },
  {
    emi: emi,
    overPayment: 270,
  },
  {
    emi: emi,
    overPayment: 350,
  },
  {
    emi: emi,
    overPayment: 100,
  },
  {
    emi: emi,
    overPayment: 210,
  },
  {
    emi: emi,
    overPayment: 350,
  },
  {
    emi: emi,
    overPayment: 270,
  },
  {
    emi: emi,
    overPayment: 370,
  },
  {
    emi: emi,
    overPayment: 0,
  },
  {
    emi: emi,
    overPayment: 200,
  },
  {
    emi: emi,
    overPayment: 310,
  },
];

const COLORS = ['#989999', '#BEC0C0'];
const KEYS = ['emi', 'overPayment'];

export class StackBarGraph extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScrollIndex: 0,
    };
  }

  /**
   * This function is to decrement currentScrollIndex by 1 upon left click
   */

  handleGraphLeftSwipe = () => {
    if (this.state.currentScrollIndex)
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex - 1,
      });
  };

  /**
   * This function is to Increment currentScrollIndex by 1 upon right click
   */

  handleGraphRightSwipe = () => {
    if (this.state.currentScrollIndex < monthNames.length / GRAPH_OFFSET - 1)
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex + 1,
      });
  };

  render() {
    //Calculating current graph and month data to be rendered out of all available data

    let currData = data.slice(
      this.state.currentScrollIndex * GRAPH_OFFSET,
      GRAPH_OFFSET * (this.state.currentScrollIndex + 1),
    );
    let currMonthName = monthNames.slice(
      this.state.currentScrollIndex * GRAPH_OFFSET,
      GRAPH_OFFSET * (this.state.currentScrollIndex + 1),
    );
    return (
      <View>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => this.handleGraphLeftSwipe()}
            style={{alignSelf: 'center'}}
            hitSlop={appConstants.HIT_SLOP}>
            <Text style={{fontSize: 32, alignSelf: 'center'}}>{'<'}</Text>
          </TouchableOpacity>
          <View style={{flex: 1, marginHorizontal: 4}}>
            <TouchableOpacity
              onPress={() => Alert.alert('Navigate to Monthly details')}>
              <View>
                <View
                  style={{
                    position: 'absolute',
                    //Calculating height of overlay line which depicts the MonthTarget
                    height:
                      ((appConstants.GRAPH_HEIGHT - 24) / monthlyTarget) *
                      (appConstants.GRAPH_HEIGHT - 24),
                    bottom: 0,
                    flex: 1,
                    width: '100%',
                    borderTopColor: '#7C7C7C',
                    borderTopWidth: 0.3,
                    zIndex: 1,
                  }}
                />
                <StackedBarChart
                  style={styles.barChart}
                  keys={KEYS}
                  colors={COLORS}
                  data={currData}
                  showGrid={false}
                  contentInset={{
                    top: 24,
                    left: 24,
                    right: 24,
                  }}
                  animate={true}
                  spacingInner={0.3}
                />
              </View>
              <View style={styles.monthView}>
                {currMonthName.map((item, index) => {
                  return (
                    <Text
                      style={{
                        fontSize: 20,
                        color: currentMonth === item ? '#7C7C7C' : '#989999',
                        fontStyle: 'italic',
                        textDecorationLine:
                          currentMonth === item && 'underline',
                      }}
                      key={index}>
                      {item}
                    </Text>
                  );
                })}
              </View>
            </TouchableOpacity>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.monthDetails,
                    {borderRightColor: '#989999', borderRightWidth: 1},
                  ]}>
                  <Text style={styles.monthHeaderText}>
                    Projected Time Saving
                  </Text>
                  <Text style={styles.monthDetailsText}>3 Months</Text>
                </View>
                <View style={styles.monthDetails}>
                  <Text style={styles.monthHeaderText}>
                    Projected Interest Saving
                  </Text>
                  <Text
                    style={[
                      styles.monthDetailsText,
                      {width: '100%', marginLeft: 4},
                    ]}>
                    £ 175
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.handleGraphRightSwipe()}
            style={{alignSelf: 'center'}}
            hitSlop={appConstants.HIT_SLOP}>
            <Text style={{fontSize: 32}}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

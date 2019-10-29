import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';

const GRAPH_OFFSET = 6;
const HIT_SLOP = {left: 10, right: 10, top: 10, bottom: 10};
const GRAPH_HEIGHT = 200;
let minStackHeight = 0;
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
let currentMonth = 'May';
const data = [
  {
    month: new Date(2015, 0, 1),
    emi: emi,
    overPayment: 300,
  },
  {
    month: new Date(2015, 1, 1),
    emi: emi,
    overPayment: 370,
  },
  {
    month: new Date(2015, 2, 1),
    emi: emi,
    overPayment: 270,
  },
  {
    month: new Date(2015, 3, 1),
    emi: emi,
    overPayment: 350,
  },
  {
    month: new Date(2015, 0, 1),
    emi: emi,
    overPayment: 100,
  },
  {
    month: new Date(2015, 1, 1),
    emi: emi,
    overPayment: 210,
  },
  {
    month: new Date(2015, 0, 1),
    emi: emi,
    overPayment: 350,
  },
  {
    month: new Date(2015, 1, 1),
    emi: emi,
    overPayment: 270,
  },
  {
    month: new Date(2015, 2, 1),
    emi: emi,
    overPayment: 370,
  },
  {
    month: new Date(2015, 3, 1),
    emi: emi,
    overPayment: 0,
  },
  {
    month: new Date(2015, 0, 1),
    emi: emi,
    overPayment: 200,
  },
  {
    month: new Date(2015, 1, 1),
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

  handleGraphLeftSwipe = () => {
    if (this.state.currentScrollIndex)
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex - 1,
      });
  };

  handleGraphRightSwipe = () => {
    if (this.state.currentScrollIndex < monthNames.length / GRAPH_OFFSET - 1)
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex + 1,
      });
  };

  render() {
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
            hitSlop={HIT_SLOP}>
            <Text style={{fontSize: 32, alignSelf: 'center'}}>{'<'}</Text>
          </TouchableOpacity>
          <View style={{flex: 1, marginHorizontal: 4}}>
            <TouchableOpacity
              onPress={() => Alert.alert('Navigate to Monthly details')}>
              <View>
                <View
                  style={{
                    position: 'absolute',
                    height:
                      ((GRAPH_HEIGHT - 24) / monthlyTarget) *
                      (GRAPH_HEIGHT - 24),
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
            hitSlop={HIT_SLOP}>
            <Text style={{fontSize: 32}}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row'},
  barChart: {
    height: GRAPH_HEIGHT,
    backgroundColor: '#DEDFDF',
    borderBottomColor: '#BEC0C0',
    borderBottomWidth: 1,
  },
  monthView: {
    flexDirection: 'row',
    padding: 32,
    justifyContent: 'space-between',
    backgroundColor: '#DEDFDF',
  },
  monthDetails: {
    backgroundColor: '#BEC0C0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    width: '50%',
  },
  monthDetailsText: {color: '#7C7C7C', fontSize: 24},
  monthHeaderText: {
    fontSize: 14,
    color: '#908F8F',
    fontStyle: 'italic',
    paddingBottom: 4,
  },
});

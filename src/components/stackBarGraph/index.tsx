import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';

interface props {}

interface state {}

var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
let currentMonth = 'May';
const data = [
  {
    month: new Date(2015, 0, 1),
    emi: 200,
    monthlyTarget: 300,
  },
  {
    month: new Date(2015, 1, 1),
    emi: 200,
    monthlyTarget: 370,
  },
  {
    month: new Date(2015, 2, 1),
    emi: 200,
    monthlyTarget: 270,
  },
  {
    month: new Date(2015, 3, 1),
    emi: 200,
    monthlyTarget: 390,
  },
  {
    month: new Date(2015, 0, 1),
    emi: 200,
    monthlyTarget: 400,
  },
  {
    month: new Date(2015, 1, 1),
    emi: 200,
    monthlyTarget: 210,
  },
];

const colors = ['#989999', '#BEC0C0'];
const keys = ['emi', 'monthlyTarget'];

export class StackBarGraph extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text style={styles.dottedText}>
          ------------------------------------------------------------
        </Text>
        <StackedBarChart
          style={styles.barChart}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{top: 30, left: 30, right: 30}}
          animate={true}
          spacingInner={0.3}
        />
        <View>
          <View style={styles.monthView}>
            {monthNames.map((item, index) => {
              return (
                <Text
                  style={{
                    fontSize: 20,
                    color: currentMonth === item ? '#7C7C7C' : '#989999',
                    fontStyle: 'italic',
                    textDecorationLine: currentMonth === item && 'underline',
                  }}
                  key={index}>
                  {item}
                </Text>
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.monthDetails}>
              <Text style={styles.monthDetailsText}>3 Months</Text>
            </View>
            <View style={styles.monthDetails}>
              <Text style={{color: '#7C7C7C', fontSize: 24}}>175</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dottedText: {
    position: 'absolute',
    bottom: 218,
    color: '#7C7C7C',
    zIndex: 1,
  },
  barChart: {height: 250, backgroundColor: '#DEDFDF'},
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
});

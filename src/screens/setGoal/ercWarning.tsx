import React from 'react';
import {View, Text, Image} from 'react-native';
import {localeString, LOCALE_STRING, COLOR} from '../../utils';
import {warning} from '../../assets';
import * as Animatable from 'react-native-animatable';
import {styles} from './styles';

export class ErcWarning extends React.Component {
  render() {
    return (
      <Animatable.View
        animation="fadeInDown"
        easing="ease-in-circ"
        duration={200}
        style={styles.ercContainer}>
        <View>
          <Image source={warning} height={20} width={20} />
        </View>
        <View style={{paddingLeft: 10}}>
          <Text style={{color: COLOR.VOILET, fontSize: 16, lineHeight: 24}}>
            {localeString(LOCALE_STRING.SET_GOAL_SCREEN.ERC_TITLE)}
          </Text>
          <Text style={styles.ercInnerContainer}>
            {localeString(LOCALE_STRING.SET_GOAL_SCREEN.ERC_MESSAGE)}
          </Text>
        </View>
      </Animatable.View>
    );
  }
}

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {
  localeString,
  LOCALE_STRING,
  APP_CONSTANTS,
  STYLE_CONSTANTS,
  COLOR,
} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface props {
  handleFirstButton: () => void;
  handleLinkButton: () => void;
}
interface state {}

export class SaveInterestOverlay extends React.Component<props, state> {
  render() {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={150}
        style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainMessage}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.CURRENTY_SUPPORTS)}
          </Text>
          <View style={styles.listView}>
            <View style={styles.list}>
              <Icon
                name="check-circle"
                size={STYLE_CONSTANTS.margin.LARGISH}
                color={COLOR.CARIBBEAN_GREEN}
              />
              <Text style={styles.listText}>
                {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.RESIDENTIAL)}
              </Text>
            </View>
            <View style={styles.list}>
              <Icon
                name="check-circle"
                size={STYLE_CONSTANTS.margin.LARGISH}
                color={COLOR.CARIBBEAN_GREEN}
              />
              <Text style={styles.listText}>
                {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.REPAYMENT)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.props.handleFirstButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Text style={styles.firstText}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.CONTINUE)}
            </Text>
          </TouchableOpacity>
          <Text style={styles.descriptionText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.NOT_YOU)}
            <Text
              style={styles.descriptionTextLink}
              onPress={this.props.handleLinkButton}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.REGISTER)}
            </Text>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.READY_FOR_YOU)}
          </Text>
        </View>
      </Animatable.View>
    );
  }
}

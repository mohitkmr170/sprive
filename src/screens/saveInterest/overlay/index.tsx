import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {APP_CONSTANTS, STYLE_CONSTANTS, COLOR} from '../../../utils';
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
        duration={100}
        style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainMessage}>Sprive currently supports</Text>
          <View style={styles.listView}>
            <Text style={styles.list}>
              <Icon
                style={styles.listIcon}
                name="check-circle"
                size={STYLE_CONSTANTS.margin.NORMAL}
                color={COLOR.CARIBBEAN_GREEN}
              />
              <Text style={styles.listText}>Residential mortgages</Text>
            </Text>
            <Text style={styles.list}>
              <Icon
                style={styles.listIcon}
                name="check-circle"
                size={STYLE_CONSTANTS.margin.NORMAL}
                color={COLOR.CARIBBEAN_GREEN}
              />
              <Text style={styles.listText}>Repayment mortgages</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.props.handleFirstButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Text style={styles.firstText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.descriptionText}>
            Not you?{' '}
            <Text
              style={styles.descriptionTextLink}
              onPress={this.props.handleLinkButton}>
              Register,{' '}
            </Text>
            interest and we’ll let you know as soon as we’re ready for you
          </Text>
        </View>
      </Animatable.View>
    );
  }
}

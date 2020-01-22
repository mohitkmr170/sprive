import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {APP_CONSTANTS} from '../../utils';

interface props {
  handleFirstButton: () => void;
  handleSecondButton: () => void;
  mainTitle: string;
  mainMessage: string;
  infoTitle: string;
  icon: any;
  firstButtonText: string;
  secondButtonText: string;
}
interface state {}

export class StatusOverlay extends React.Component<props, state> {
  render() {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={100}
        style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Image source={this.props.icon} height={72} width={72} />
          {this.props.mainTitle && (
            <Text style={styles.innerTitle}>{this.props.mainTitle}</Text>
          )}
          {this.props.mainMessage && (
            <Text style={styles.mainMessage}>{this.props.mainMessage}</Text>
          )}
          {this.props.infoTitle && (
            <Text style={styles.infoTitle}>{this.props.infoTitle}</Text>
          )}
          {this.props.firstButtonText && (
            <TouchableOpacity
              onPress={this.props.handleFirstButton}
              hitSlop={APP_CONSTANTS.HIT_SLOP}>
              <Text style={styles.firstText}>{this.props.firstButtonText}</Text>
            </TouchableOpacity>
          )}
          {this.props.secondButtonText && (
            <TouchableOpacity
              onPress={this.props.handleSecondButton}
              hitSlop={APP_CONSTANTS.HIT_SLOP}>
              <Text style={styles.secondText}>
                {this.props.secondButtonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
    );
  }
}

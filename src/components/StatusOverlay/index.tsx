import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {localeString} from '../../utils/i18n';
import {LOCALE_STRING} from '../../utils/constants';

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
            <Text
              style={{
                color: '#00C1A4',
                fontSize: 36,
                lineHeight: 36,
                fontWeight: '500',
                paddingTop: 32,
                textAlign: 'center',
              }}>
              {this.props.mainTitle}
            </Text>
          )}
          {this.props.mainMessage && (
            <Text
              style={{
                color: '#09245E',
                fontSize: 18,
                lineHeight: 28,
                fontWeight: '500',
                paddingTop: 20,
                textAlign: 'center',
              }}>
              {this.props.mainMessage}
            </Text>
          )}
          {this.props.infoTitle && (
            <Text
              style={{
                color: '#09245E',
                opacity: 0.5,
                fontSize: 14,
                lineHeight: 22,
                paddingTop: 10,
                textAlign: 'center',
              }}>
              {this.props.infoTitle}
            </Text>
          )}
          {this.props.handleFirstButton && (
            <TouchableOpacity onPress={this.props.handleFirstButton}>
              <Text
                style={{
                  color: '#DD2371',
                  fontSize: 16,
                  lineHeight: 24,
                  marginTop: 32,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                {this.props.firstButtonText}
              </Text>
            </TouchableOpacity>
          )}
          {this.props.handleSecondButton && (
            <TouchableOpacity onPress={this.props.handleSecondButton}>
              <Text
                style={{
                  color: '#09245E',
                  opacity: 0.3,
                  fontSize: 16,
                  lineHeight: 24,
                  marginTop: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                {this.props.secondButtonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
    );
  }
}

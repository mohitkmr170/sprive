import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {correct} from '../../assets';
import {localeString} from '../../utils/i18n';
import {LOCALE_STRING} from '../../utils/constants';

interface props {
  handleContinue: () => void;
}
interface state {}

export class StatusOverlay extends React.Component<props, state> {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Image source={correct} height={72} width={72} />
          <Text style={styles.innerTitle}>
            {localeString(LOCALE_STRING.STATUS_OVERLAY.OH_NO)}
          </Text>
          <Text style={styles.innerText}>
            {localeString(LOCALE_STRING.STATUS_OVERLAY.MESSAGE)}
          </Text>
          <TouchableOpacity onPress={this.props.handleContinue}>
            <Text style={styles.okPressButton}>
              {localeString(LOCALE_STRING.STATUS_OVERLAY.CONTINUE)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

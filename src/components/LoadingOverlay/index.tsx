import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {COLOR} from '../../utils/colors';
import {localeString} from '../../utils/i18n';
import {LOCALE_STRING} from '../../utils/constants';

interface props {
  size: number;
  color: string;
  loadingText: string;
}

export class LoadingModal extends React.Component<props> {
  render() {
    const {size, color, loadingText} = this.props;
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={color || COLOR.PRIMARY}
          size={size || 'small'}
        />
        <Text style={styles.textStyle}>
          {loadingText || localeString(LOCALE_STRING.LOADING)}
        </Text>
      </View>
    );
  }
}

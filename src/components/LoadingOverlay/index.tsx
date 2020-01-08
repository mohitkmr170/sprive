import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';
import {localeString} from '../../utils/i18n';
import {LOCALE_STRING} from '../../utils/constants';
import {spriveLoading} from '../../assets';

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
        <Image source={spriveLoading} style={styles.spriveLoadingGif} />
        <Text style={styles.textStyle}>
          {loadingText || localeString(LOCALE_STRING.LOADING)}
        </Text>
      </View>
    );
  }
}

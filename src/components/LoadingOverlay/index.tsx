import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {COLOR} from '../../utils/colors';

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
        <Text style={styles.textStyle}>{loadingText || 'Loading'}</Text>
      </View>
    );
  }
}

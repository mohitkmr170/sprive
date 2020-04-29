import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {get as _get} from 'lodash';
import {
  localeString,
  LOCALE_STRING,
  APP_CONSTANTS,
  STYLE_CONSTANTS,
  COLOR,
  LOCAL_KEYS,
} from '../../utils';
import {iSolidCircle} from '../../assets';

const LIST_ITEM = [
  {
    text: 'Interest-only mortgages',
  },
  {
    text: 'Buy-to-let mortgages',
  },
  {
    text: 'Commercial mortgages',
  },
];

interface props {
  handleFirstButton: () => void;
  handleLinkButton: () => void;
}
interface state {}

export class SaveInterestOverlay extends React.Component<props, state> {
  renderListItem = (item: object) => {
    return (
      <View style={styles.listContainer}>
        <Image
          source={iSolidCircle}
          height={STYLE_CONSTANTS.margin.SMALL}
          width={STYLE_CONSTANTS.margin.SMALL}
          style={styles.iconStyle}
        />
        <Text style={styles.listText}>{_get(item, LOCAL_KEYS.TEXT, '')}</Text>
      </View>
    );
  };
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
          <Text style={styles.noSupportText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.NO_SUPPORT_FOR)}
          </Text>
          <View style={styles.listView}>
            {LIST_ITEM.map((item, index) => this.renderListItem(item))}
          </View>
          <TouchableOpacity
            onPress={this.props.handleFirstButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Text style={styles.firstText}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.CONTINUE)}
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.descriptionText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.NOT_YOU)}
            <Text
              style={styles.descriptionTextLink}
              onPress={this.props.handleLinkButton}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.REGISTER)}
            </Text>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.READY_FOR_YOU)}
          </Text> */}
        </View>
      </Animatable.View>
    );
  }
}

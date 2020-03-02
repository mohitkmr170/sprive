import React from 'react';
import {View} from 'react-native';
import {get as _get} from 'lodash';
import Swiper from 'react-native-swiper';
import {MyProgress, MyPayments} from '../../components';
import {styles} from './styles';
import {
  localeString,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  LOCAL_KEYS,
} from '../../utils';

interface props {
  currentMonthTarget: any;
}
interface state {}

const CARD_LIST = [
  {
    name: localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.MY_PRGRESS),
  },
  {
    name: localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.MY_PAYMENTS),
  },
];

export class PaymentProgressCard extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  renderCards = (item: object) => {
    const {currentMonthTarget} = this.props;
    return (
      <View style={styles.swiperCardContainer}>
        {_get(item, LOCAL_KEYS.SWIPER_NAME, '') ===
        localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.MY_PRGRESS) ? (
          <MyProgress />
        ) : (
          <MyPayments currentMonthTarget={currentMonthTarget} />
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.swiperContainer}>
        <Swiper
          showsButtons={false}
          index={0}
          pagingEnabled
          horizontal
          loop={false}
          height={
            10 * STYLE_CONSTANTS.margin.HUMONGOUS +
            STYLE_CONSTANTS.margin.SMALLISH
          }
          paginationStyle={styles.PaginationContainerStyle}
          dotStyle={styles.inactiveDotStyle}
          key={CARD_LIST.length}
          activeDotStyle={styles.dotStyle}>
          {CARD_LIST.map(item => this.renderCards(item))}
        </Swiper>
      </View>
    );
  }
}

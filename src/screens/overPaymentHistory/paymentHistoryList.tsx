import React from 'react';
import {View, Image, Text} from 'react-native';
import {get as _get} from 'lodash';
import {iSpriveLogo} from '../../assets';
import {styles} from './styles';
import {
  getNumberWithCommas,
  COLOR,
  DB_KEYS,
  localeString,
  LOCALE_STRING,
} from '../../utils';
import Moment from 'moment';

interface props {
  item: object;
}
interface state {}

export class PaymentHistoryList extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {item} = this.props;
    const amount = _get(item, DB_KEYS.PAYMENT_HISTORY.AMOUNT, '').toFixed(2);
    const amountWithCommas = getNumberWithCommas(amount);
    let formattedDate = Moment(
      new Date(_get(item, DB_KEYS.PAYMENT_HISTORY.PAYMENT_DATE, '')),
    ).format('DD/MM/YY');
    return (
      <View style={styles.cardContainer}>
        <View style={styles.logoContainer}>
          <Image source={iSpriveLogo} />
          <Text style={styles.lenderPaymentText}>
            {localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.LENDER_PAYMENT)}
          </Text>
        </View>
        <View style={styles.cardMainContainer}>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            {/* <Text style={styles.refIdText}>
              {_get(item, DB_KEYS.PAYMENT_HISTORY.REFERENCE_NUMBER, '')
                ? _get(item, DB_KEYS.PAYMENT_HISTORY.REFERENCE_NUMBER, '')
                : 'Ref EHSLW6191CIQLN'}
            </Text>
            <Text style={styles.idText}>
              {_get(item, DB_KEYS.PAYMENT_HISTORY.ID, '')
                ? _get(item, DB_KEYS.PAYMENT_HISTORY.ID, '')
                : '55557777'}
            </Text> */}
          </View>
          <View style={styles.rightContainer}>
            <View
              style={[
                styles.paymentTypeContainer,
                {
                  backgroundColor: _get(
                    item,
                    DB_KEYS.PAYMENT_HISTORY.IS_OVERPAYMENT,
                    '',
                  )
                    ? COLOR.SLIGHT_YELLOW
                    : COLOR.STEEL_GRAY,
                },
              ]}>
              <Text
                style={[
                  {
                    color: _get(
                      item,
                      DB_KEYS.PAYMENT_HISTORY.IS_OVERPAYMENT,
                      '',
                    )
                      ? COLOR.DARK_YELLOW
                      : COLOR.DARK_BLUE,
                  },
                  styles.paymentTypeText,
                ]}>
                {_get(item, DB_KEYS.PAYMENT_HISTORY.IS_OVERPAYMENT, '')
                  ? 'Overpayment'
                  : 'Fixed'}
              </Text>
            </View>
            <Text
              style={[
                styles.amountText,
                {
                  color: _get(item, DB_KEYS.PAYMENT_HISTORY.IS_OVERPAYMENT, '')
                    ? COLOR.DARK_YELLOW
                    : COLOR.DARK_BLUE,
                },
              ]}>
              £{amountWithCommas}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

import React from 'react';
import {View, Image, Text} from 'react-native';
import {get as _get} from 'lodash';
import {hsbcBank} from '../../assets';
import {styles} from './styles';
import {COLOR} from '../../utils/colors';
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
    let formattedDate = Moment(new Date(_get(item, 'payment_date', ''))).format(
      'DD/MM/YY',
    );
    return (
      <View style={styles.cardContainer}>
        <Image source={hsbcBank} />
        <View style={styles.cardMainContainer}>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.refIdText}>
              {_get(item, 'reference_number', '')
                ? _get(item, 'reference_number', '')
                : 'Ref EHSLW6191CIQLN'}
            </Text>
            <Text style={styles.idText}>
              {_get(item, 'id', '') ? _get(item, 'id', '') : '55557777'}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <View
              style={[
                styles.paymentTypeContainer,
                {
                  backgroundColor: _get(item, 'is_overpayment', '')
                    ? COLOR.SLIGHT_YELLOW
                    : COLOR.STEEL_GRAY,
                },
              ]}>
              <Text
                style={[
                  {
                    color: _get(item, 'is_overpayment', '')
                      ? COLOR.DARK_YELLOW
                      : COLOR.DARK_BLUE,
                  },
                  styles.paymentTypeText,
                ]}>
                {_get(item, 'is_overpayment', '') ? 'Overpayment' : 'Fixed'}
              </Text>
            </View>
            <Text
              style={[
                styles.amountText,
                {
                  color: _get(item, 'is_overpayment', '')
                    ? COLOR.DARK_YELLOW
                    : COLOR.DARK_BLUE,
                },
              ]}>
              £{_get(item, 'amount', '').toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';
import {hsbc} from '../../assets';
import {localeString, LOCALE_STRING} from '../../utils';

interface props {}
interface state {}

export class CardDetails extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    /*
    TODO : Constant data should be changed to actual, TBD
    */
    return (
      <View style={styles.cardMainContainer}>
        <View style={styles.accountDetailsContainer}>
          <View style={styles.accNumberContainer}>
            <Text style={styles.accNumberText}>
              {localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.ACCOUNT_NUMBER)}
            </Text>
            <Text style={styles.accNumber}>55557777</Text>
          </View>
          <View>
            <Text style={styles.sortCodeText}>
              {localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.SORT_CODE)}
            </Text>
            <Text style={styles.sortCode}>20-20-20</Text>
          </View>
        </View>
        <Text style={styles.refCodeText}>
          {localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.REFERENCE_CODE)}
        </Text>
        <Text style={styles.refCode}>EHSLW6191CIQLN</Text>
        <Image source={hsbc} style={styles.bankImage} />
      </View>
    );
  }
}

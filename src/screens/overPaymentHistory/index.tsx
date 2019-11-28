import React from 'react';
import {View, Text, Image, ScrollView, TextInput, FlatList} from 'react-native';
import {Header} from '../../components';
import {styles} from './styles';
import {LOCALE_STRING} from '../../utils/constants';
import {localeString} from '../../utils/i18n';
import {chatIcon, hsbcBank} from '../../assets';
import {COLOR} from '../../utils/colors';
interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
}
interface state {}

//Sample data for overPayment history, will change as per response
const overPaymentHostoryData = [
  {
    paymentType: 'Overpayment',
    date: '08/04/19',
    refId: 'Ref EHSLW6191CIQLN',
    id: '55557777',
    amount: '250.00',
  },
  {
    paymentType: 'Fixed',
    date: '08/04/19',
    refId: 'Ref EHSLW6191CIQLN',
    id: '55557777',
    amount: '250.00',
  },
  {
    paymentType: 'Overpayment',
    date: '08/04/19',
    refId: 'Ref EHSLW6191CIQLN',
    id: '55557777',
    amount: '250.00',
  },
  {
    paymentType: 'Fixed',
    date: '08/04/19',
    refId: 'Ref EHSLW6191CIQLN',
    id: '55557777',
    amount: '250.00',
  },
];

export class OverpaymentHistory extends React.Component<props, state> {
  returnItem = (item: object) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={hsbcBank} />
        <View style={styles.cardMainContainer}>
          <View>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.refIdText}>{item.refId}</Text>
            <Text style={styles.idText}>{item.id}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View
              style={[
                styles.paymentTypeContainer,
                {
                  backgroundColor:
                    item.paymentType ===
                    localeString(
                      LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT,
                    )
                      ? COLOR.SLIGHT_YELLOW
                      : COLOR.STEEL_GRAY,
                },
              ]}>
              <Text
                style={[
                  {
                    color:
                      item.paymentType ===
                      localeString(
                        LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT,
                      )
                        ? COLOR.DARK_YELLOW
                        : COLOR.DARK_BLUE,
                  },
                  styles.paymentTypeText,
                ]}>
                {item.paymentType}
              </Text>
            </View>
            <Text
              style={[
                styles.amountText,
                {
                  color:
                    item.paymentType ===
                    localeString(
                      LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT,
                    )
                      ? COLOR.DARK_YELLOW
                      : COLOR.DARK_BLUE,
                },
              ]}>
              £ {item.amount}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header
          title={localeString(
            LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT_HISTORY,
          )}
          rightIconPresent
          iconName={chatIcon}
          onBackPress={() => navigation.goBack()}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchTextInput}
          placeholder={localeString(
            LOCALE_STRING.OVER_PAYMENT_HISTORY.SEARCH_MONTH,
          )}
          placeholderTextColor={COLOR.REDUX_FORM_INPUT_CONTAINER}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.flatListContainer}>
            <FlatList
              data={overPaymentHostoryData}
              extraData={this.props}
              keyExtractor={index => index.toString()}
              renderItem={({item, index}) => this.returnItem(item)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

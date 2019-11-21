import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header, IncDecCounter, StatusOverlay} from '../../components';
import {chatIcon, correct, tick} from '../../assets';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils/constants';
import {AmountContainer} from './amountContainer';
import {CardDetails} from './cardDetails';
import {COLOR} from '../../utils/colors';
import {getNumberWithCommas} from '../../utils/helperFunctions';
import {localeString} from '../../utils/i18n';

const INC_DEC_OFFSET = 10;
const EDIT_ICON_NAME = 'pencil';
const OVERPAYMENT_MAX_CAP = 10000;
const OVERPAYMENT_MIN_CAP = 0;

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
}
interface state {
  amount: string;
  error: boolean;
}

export class OverPayment extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      amount: '',
      error: false,
    };
  }

  handleEdit = () => {
    this.textInputBox.focus();
  };

  handleFirstButton = () => {
    //Try again functionality
  };

  handleSecondButton = () => {
    this.setState({
      error: false,
    });
  };

  handleIncPress = () => {
    let currentAmount = this.state.amount.replace(/,/g, '');
    let updatedAmount = Number(currentAmount) + INC_DEC_OFFSET;
    if (updatedAmount <= OVERPAYMENT_MAX_CAP)
      this.setState({
        amount: String(updatedAmount),
      });
  };

  handlePayNow = () => {
    this.setState({
      error: true,
    });
  };

  handleDecPress = () => {
    let currentAmount = this.state.amount.replace(/,/g, '');
    let updatedAmount = Number(currentAmount) - INC_DEC_OFFSET;
    if (updatedAmount >= OVERPAYMENT_MIN_CAP)
      this.setState({
        amount: String(updatedAmount),
      });
  };

  render() {
    const {amount, error} = this.state;
    let amountWithOutCommas = String(amount).replace(/,/g, '');
    let amountWithCommas = getNumberWithCommas(amountWithOutCommas);
    return (
      <View style={styles.topContainer}>
        <Header
          title={localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT)}
          rightIconPresent
          iconName={chatIcon}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.cardContainer}>
              <View style={styles.innerLeftContainer}>
                <Text style={styles.overPaymentOfText}>
                  {localeString(
                    LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT_OF,
                  )}
                </Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.poundText}>£ </Text>
                  {/*
                    TODO : Validations of maxCap===10000 to be added, position TBD
                    */}
                  <TextInput
                    style={styles.textInput}
                    ref={input => {
                      this.textInputBox = input;
                    }}
                    maxLength={6}
                    onChangeText={text => this.setState({amount: text})}
                    keyboardType="number-pad"
                    placeholder="175"
                    placeholderTextColor={COLOR.BLACKISH_GRAY}>
                    {amountWithCommas}
                  </TextInput>
                  <TouchableOpacity
                    onPress={() => this.handleEdit()}
                    hitSlop={APP_CONSTANTS.HIT_SLOP}>
                    <Icon
                      name={EDIT_ICON_NAME}
                      size={STYLE_CONSTANTS.font.SIZE.NORMAL}
                      color={COLOR.WHITE}
                      style={{opacity: 0.5}}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.overPaymentOfText}>£175 more to go</Text>
              </View>
              <IncDecCounter
                onIncrementPress={() => this.handleIncPress()}
                onDecrementPress={() => this.handleDecPress()}
              />
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.leftContainer}>
                <AmountContainer
                  title={localeString(
                    LOCALE_STRING.OVER_PAYMENT_HISTORY.AVAILABLE_BALANCE,
                  )}
                  monthlyTarget={'21,312.00'}
                />
              </View>
              <View style={styles.rightContainer}>
                <AmountContainer
                  title={localeString(
                    LOCALE_STRING.OVER_PAYMENT_HISTORY.MONTHLY_TARGET,
                  )}
                  monthlyTarget={'322.00'}
                />
              </View>
            </View>
            <View style={styles.cardDetailsContainer}>
              <CardDetails />
            </View>
            <Text style={styles.staticText}>
              {localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.BASIC_INFO)}
            </Text>
          </View>
        </ScrollView>
        <Button
          title={localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.PAY_NOW)}
          onPress={() => this.handlePayNow()}
          titleStyle={styles.buttonExteriorStyle}
          buttonStyle={styles.buttonInteriorStyle}
        />
        {error && (
          /*
          TODO : Conditions to be added as per error state, and props will be accordingly handled, 1/0 added temporarily
          */
          <StatusOverlay
            icon={1 ? tick : correct}
            mainTitle={1 && '£ 300'}
            mainMessage={1 ? 'Paid towards your mortgage today' : 'Oh no!'}
            infoTitle={
              1
                ? 'Brilliant! At this rate, you could save £1,690 in interest, and pay off your mortgage 3 years earlier'
                : 'Something went wrong Please try again'
            }
            firstButtonText={1 ? 'Next  ' : 'Try Again'}
            handleFirstButton={() => this.handleFirstButton()}
            secondButtonText={'Cancel'}
            handleSecondButton={() => this.handleSecondButton()}
          />
        )}
      </View>
    );
  }
}

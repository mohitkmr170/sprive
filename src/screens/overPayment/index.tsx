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
import {connect} from 'react-redux';
import {setOverpayment} from '../../store/reducers';
import {
  Header,
  IncDecCounter,
  StatusOverlay,
  GeneralStatusBar,
} from '../../components';
import {chatIcon, correct, tick} from '../../assets';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {reset} from '../../navigation/navigationService';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
} from '../../utils/constants';
import {get as _get} from 'lodash';
import {AmountContainer} from './amountContainer';
import {CardDetails} from './cardDetails';
import {COLOR} from '../../utils/colors';
import {
  getNumberWithCommas,
  showSnackBar,
  getRoundFigure,
} from '../../utils/helperFunctions';
import {localeString} from '../../utils/i18n';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';

const INC_DEC_OFFSET = 10;
const EDIT_ICON_NAME = 'pencil';
const OVERPAYMENT_MAX_CAP = 10000;
const OVERPAYMENT_MIN_CAP = 0;
const YEARS = 'years';
const MONTHS = 'months';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  setOverpayment: (payload: object) => void;
  getUserInfoResponse: object;
  getMonthlyPaymentRecordResponse: object;
  setOverpaymentResponse: object;
}
interface state {
  amount: string;
  error: boolean;
  isPaymentDone: boolean;
}

class UnconnectedOverPayment extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      amount: '',
      error: true,
      isPaymentDone: false,
    };
  }

  componentDidMount = async () => {
    const {getMonthlyPaymentRecordResponse, getUserInfoResponse} = this.props;
    const currentBalance = _get(
      getMonthlyPaymentRecordResponse,
      DB_KEYS.BALANCE_AMOUNT,
      null,
    );
    if (currentBalance)
      //If user has some balance_amount pending, then it will show => x more to go!
      this.setState({
        amount: String(Math.round(currentBalance)),
      });
    //Send user event to GA.
    _gaSetCurrentScreen('OverpaymentScreen');
  };

  handleEdit = () => {
    this.textInputBox.focus();
  };

  handleFirstButton = () => {
    const {error} = this.state;
    if (error) this.setState({isPaymentDone: false});
    else reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {isUserDataChanged: true});
  };

  handleSecondButton = () => {
    this.setState({
      isPaymentDone: false,
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

  handleAmountValidation = () => {
    return new Promise((resolve, reject) => {
      const {amount} = this.state;
      let withOutCommas = amount.replace(/,/g, '');
      let overPaymentAmount = Number(withOutCommas);
      if (
        overPaymentAmount > OVERPAYMENT_MIN_CAP &&
        overPaymentAmount <= OVERPAYMENT_MAX_CAP
      ) {
        return resolve(true);
      } else return reject(false);
    });
  };

  handlePayNow = async () => {
    this.handleAmountValidation()
      .then(async res => {
        if (res) {
          const {getUserInfoResponse} = this.props;
          let userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
          if (userId) {
            const {setOverpayment} = this.props;
            const amountWithOutCommas = this.state.amount.replace(/,/g, '');
            const payload = {
              [PAYLOAD_KEYS.USER_ID]: userId,
              [PAYLOAD_KEYS.OVERPAYMENT.OVERPAYMENT_AMOUNT]: Number(
                amountWithOutCommas,
              ),
            };
            await setOverpayment(payload);
            const {setOverpaymentResponse} = this.props;
            if (!_get(setOverpaymentResponse, DB_KEYS.ERROR, false))
              this.setState({
                error: false,
                isPaymentDone: true,
              });
            else this.setState({isPaymentDone: true});
          }
        }
      })
      .catch(err => {
        showSnackBar({}, localeString(LOCALE_STRING.INVALID_AMOUNT));
      });
  };

  handleDecPress = () => {
    let currentAmount = this.state.amount.replace(/,/g, '');
    let updatedAmount = Number(currentAmount) - INC_DEC_OFFSET;
    if (updatedAmount > OVERPAYMENT_MIN_CAP)
      this.setState({
        amount: String(updatedAmount),
      });
  };

  render() {
    const {amount, error, isPaymentDone} = this.state;
    const {
      getMonthlyPaymentRecordResponse,
      setOverpaymentResponse,
    } = this.props;
    let interesetSaving = Math.round(
      _get(setOverpaymentResponse, DB_KEYS.PROJECTED.INTEREST_SAVING, 0),
    );
    let savedYears = _get(
      setOverpaymentResponse,
      DB_KEYS.PROJECTED.YEARS_SAVED,
      0,
    );
    let savedMonths = _get(
      setOverpaymentResponse,
      DB_KEYS.PROJECTED.MONTHS_SAVED,
      0,
    );
    let currentRemainingBalance = getNumberWithCommas(
      String(
        Math.round(
          _get(getMonthlyPaymentRecordResponse, DB_KEYS.BALANCE_AMOUNT, null),
        ),
      ),
    );
    let monthlyTarget = getRoundFigure(
      _get(getMonthlyPaymentRecordResponse, DB_KEYS.MONTHLY_TARGET, null),
    );
    let amountWithOutCommas = String(amount).replace(/,/g, '');
    let amountWithCommas = getNumberWithCommas(amountWithOutCommas);
    let interesetSavingWithCommas = getNumberWithCommas(
      Math.round(interesetSaving),
    );
    return (
      <View style={styles.topContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT)}
          rightIconPresent
          iconName={chatIcon}
          onBackPress={() =>
            reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
              isUserDataChanged: false,
            })
          }
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
                  <Text style={styles.poundText}>£</Text>
                  <TextInput
                    style={styles.textInput}
                    ref={input => {
                      this.textInputBox = input;
                    }}
                    maxLength={6}
                    onChangeText={text => this.setState({amount: text})}
                    keyboardType="number-pad"
                    placeholder="0"
                    placeholderTextColor={COLOR.REDUX_TEXTINPUT_TEXT}>
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
                <Text style={styles.overPaymentOfText}>
                  {currentRemainingBalance
                    ? `£${currentRemainingBalance} more to go`
                    : localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.ON_TARCK)}
                </Text>
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
                  monthlyTarget={'21,312'}
                />
              </View>
              <View style={styles.rightContainer}>
                <AmountContainer
                  title={localeString(
                    LOCALE_STRING.OVER_PAYMENT_HISTORY.MONTHLY_TARGET,
                  )}
                  monthlyTarget={getNumberWithCommas(String(monthlyTarget))}
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
          loading={_get(setOverpaymentResponse, DB_KEYS.IS_FETCHING, false)}
        />
        {isPaymentDone && (
          <StatusOverlay
            icon={!error ? tick : correct}
            mainTitle={!error && `£${amountWithCommas}`}
            mainMessage={
              !error
                ? localeString(LOCALE_STRING.STATUS_OVERLAY.PAID)
                : localeString(LOCALE_STRING.STATUS_OVERLAY.OH_NO)
            }
            infoTitle={
              !error
                ? localeString(LOCALE_STRING.STATUS_OVERLAY.BRILLIANT, {
                    interestSaved: interesetSavingWithCommas,
                    timeSaved: savedYears ? savedYears + ` ${YEARS}` : '',
                    month: savedMonths ? savedMonths + ` ${MONTHS}` : '',
                  })
                : localeString(LOCALE_STRING.STATUS_OVERLAY.WENT_WRONG)
            }
            firstButtonText={
              !error
                ? localeString(LOCALE_STRING.STATUS_OVERLAY.NEXT)
                : localeString(LOCALE_STRING.STATUS_OVERLAY.TRY_AGAIN)
            }
            handleFirstButton={() => this.handleFirstButton()}
            secondButtonText={
              error && localeString(LOCALE_STRING.STATUS_OVERLAY.CANCEL)
            }
            handleSecondButton={() => this.handleSecondButton()}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getMonthlyPaymentRecordResponse: state.getMonthlyPaymentRecord,
  setOverpaymentResponse: state.setOverpayment,
});

const bindActions = dispatch => ({
  setOverpayment: payload => dispatch(setOverpayment.fetchCall(payload)),
});

export const OverPayment = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedOverPayment);

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {localeString, LOCALE_STRING} from '../../utils';

interface props {
  isVisible: boolean;
  handleDismiss: () => void;
  monthlyTarget: string;
  remindeMeTomorrow: () => void;
  remindeMeNextWeek: () => void;
}
interface state {}

export class PaymentReminderModal extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  render() {
    const {isVisible, handleDismiss, monthlyTarget} = this.props;
    return (
      <Modal isVisible={isVisible} style={{justifyContent: 'flex-end'}}>
        <View style={styles.paymentModalContainer}>
          <View style={styles.modalTopContainer}>
            <Text style={styles.stayOnTrackText}>
              {localeString(LOCALE_STRING.PAYMENT_REMINDER.STAY_ON_TRACK)}
              <Text style={styles.overPaymentText}> £{monthlyTarget}</Text>{' '}
              {localeString(LOCALE_STRING.PAYMENT_REMINDER.TOWARDS_MORTGAGE)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.remindMeTomorrowText}
            onPress={this.props.remindeMeTomorrow}>
            <Text style={styles.laterOptionText}>
              {localeString(LOCALE_STRING.PAYMENT_REMINDER.REMIND_ME_TOMORROW)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remindMeNextWeekText}
            onPress={this.props.remindeMeNextWeek}>
            <Text style={styles.laterOptionText}>
              {localeString(LOCALE_STRING.PAYMENT_REMINDER.REMIND_ME_NEXT_WEEK)}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleDismiss}
          style={styles.modalDismissContainer}>
          <Text style={styles.dismissText}>
            {localeString(LOCALE_STRING.PAYMENT_REMINDER.DISMISS)}
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

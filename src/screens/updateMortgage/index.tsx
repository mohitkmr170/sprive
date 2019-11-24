import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, MortgageInputContainer} from '../../components';
import {localeString} from '../../utils/i18n';
import {DB_KEYS} from '../../utils/constants';
import {Button} from 'react-native-elements';
import {reduxForm} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils/constants';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
  handleSubmit: (firstParam: (values: object) => void) => void;
}

interface state {
  enableButton: boolean;
}

export class UnconnectedUpdateMortgage extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      enableButton: true,
    };
    this.handlePayNowVisibility = this.handlePayNowVisibility.bind(this);
  }
  // Back Icon Pressed
  handleBackPress = () => {};
  // Funtion to toggle the visibility of the submit buttons
  handlePayNowVisibility() {
    this.setState({enableButton: false});
  }
  /**
   *
   * @param values : object : object with all form values
   */
  handlePayNowPress = async (values: object) => {
    console.log(
      'UnconnectedMortgageInput : handlePayNowPress : values =>',
      values,
    );
  };
  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.screenContainer}>
        <Header onBackPress={() => this.handleBackPress()} />
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.mortgageStatusProgressContainer}>
              <Text style={styles.mortgageTextData}>
                {localeString(
                  LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_MORTGAGE_DATA,
                )}
              </Text>
              <Text style={styles.progressFractionText}>1/4</Text>
            </View>
            <Text
              style={[
                styles.mainHeaderText,
                {marginTop: STYLE_CONSTANTS.margin.LARGEST},
              ]}>
              Update Mortgage
            </Text>
            <Text style={styles.mainHeaderText}>Information</Text>
            <View style={styles.mortgageFormComponent}>
              <MortgageInputContainer
                handleCalculateNowPressed={this.handlePayNowVisibility}
              />
            </View>
            <Button
              title="Update"
              onPress={handleSubmit(this.handlePayNowPress)}
              titleStyle={styles.buttonExteriorStyle}
              buttonStyle={styles.buttonInteriorStyle}
              disabled={this.state.enableButton}
              loading={false}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
export const MortgageUpdateForm = reduxForm({
  form: APP_CONSTANTS.MORTGAGE_INPUT_FORM,
})(UnconnectedUpdateMortgage);

const mapStateToProps = state => ({});

const bindActions = dispatch => ({});

export const UpdateMortgage = connect(
  mapStateToProps,
  bindActions,
)(MortgageUpdateForm);

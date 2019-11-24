import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header} from '../../components';
import {Dropdown} from 'react-native-material-dropdown';
import {chatIcon} from '../../assets';
import {STYLE_CONSTANTS} from '../../utils/constants';

const BUG_CATEGORY = [
  {
    value: 'Issue number one',
  },
  {
    value: 'Issue number two',
  },
  {
    value: 'Issue number three',
  },
  {
    value: 'Issue number four',
  },
];

const PLACEHOLDER =
  'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
}
interface state {}

export class ReportIssue extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Report an Issue"
          rightIconPresent
          iconName={chatIcon}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text
            style={{
              fontSize: 24,
              lineHeight: 36,
              color: '#09245E',
              fontWeight: '600',
            }}>
            Have an issue you want us to look into?
          </Text>
          <Dropdown
            data={BUG_CATEGORY}
            label="Bug Category"
            labelFontSize={14}
            baseColor="#09245E"
            containerStyle={{backgroundColor: '#F7F8FA', marginTop: 36}}
            itemTextStyle={{fontSize: 14, lineHeight: 22}}
            inputContainerStyle={{
              borderBottomColor: 'transparent',
              marginHorizontal: 20,
            }}
            // value={year}
            // onChangeText={newYear => this.handleYearChange(newYear)}
          />
          <Text
            style={{
              marginTop: 28,
              color: '#09245E',
              fontSize: 14,
              lineHeight: 22,
              fontWeight: '600',
            }}>
            Issue{' '}
            <Text
              style={{
                color: '#09245E4D',
                fontStyle: 'italic',
                fontWeight: 'normal',
              }}>
              (Character Limit: 250 characters)
            </Text>
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={{
              backgroundColor: '#F7F8FA',
              paddingHorizontal: 10,
              paddingVertical: 16,
              fontSize: 14,
              lineHeight: 22,
              marginTop: 10,
              height: STYLE_CONSTANTS.device.WINDOW_HEIGHT / 5,
            }}
            placeholder={PLACEHOLDER}
            placeholderTextColor="rgba(9, 36, 94, 0.5)"
          />
          <Text
            style={{
              fontSize: 14,
              lineHeight: 22,
              marginTop: 10,
              color: 'rgba(9, 36, 94, 0.3)',
            }}>
            129 ch left
          </Text>
        </View>
        <Button
          title="Report Issue"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={() => {}}
        />
      </View>
    );
  }
}

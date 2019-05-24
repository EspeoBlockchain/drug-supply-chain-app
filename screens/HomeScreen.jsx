import React, { PureComponent } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import ButtonWithIcon from '../components/ButtonWithIcon';

const logoIcon = require('../assets/images/chain.png');
const registerIcon = require('../assets/images/register.png');
const transportIcon = require('../assets/images/transportation.png');
const verifyIcon = require('../assets/images/verify.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    width: 50,
    height: 50,
  },
  logoText: {
    color: colors.logo,
    fontSize: 28,
    fontFamily: fonts.main,
  },
  buttonsContainer: {
    flex: 1,
    margin: 20,
  },
  buttons: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export default class HomeScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  onButtonPress = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.buttonsContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Drug supply chain</Text>
            <Image source={logoIcon} style={styles.icon} />
          </View>
          <View contentContainerStyle={styles.buttons}>
            <ButtonWithIcon
              onPress={() => { this.onButtonPress('Vendor'); }}
              text="Register initial handover"
              img={registerIcon}
              buttonStyle="register"
              buttonTextStyle="registerText"
            />
            <ButtonWithIcon
              onPress={() => { this.onButtonPress('Carrier'); }}
              text="Register handover"
              img={transportIcon}
              buttonStyle="transport"
              buttonTextStyle="transportText"
            />
            <ButtonWithIcon
              onPress={() => { this.onButtonPress('Verifier'); }}
              text="Verify drug item"
              img={verifyIcon}
              buttonStyle="verify"
              buttonTextStyle="verifyText"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

HomeScreen.defaultProps = {
  navigation: {},
};

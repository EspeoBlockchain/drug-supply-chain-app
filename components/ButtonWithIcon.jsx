import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 135,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fonts.main,
    flexWrap: 'wrap',
    flex: 1,
  },
  register: {
    backgroundColor: colors.registerLight,
  },
  registerText: {
    color: colors.registerDark,
  },
  transport: {
    backgroundColor: colors.transportLight,
  },
  transportText: {
    color: colors.transportDark,
  },
  verify: {
    backgroundColor: colors.verifyLight,
  },
  verifyText: {
    color: colors.verifyDark,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

const buttonWithIcon = (props) => {
  const {
    onPress,
    buttonStyle,
    buttonTextStyle,
    text,
    img,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, styles[buttonStyle]]}>
        <Text style={[styles.buttonText, styles[buttonTextStyle]]}>{text}</Text>
        <Image source={img} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

buttonWithIcon.propTypes = {
  onPress: PropTypes.func,
  buttonStyle: PropTypes.string,
  buttonTextStyle: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.number,
};

buttonWithIcon.defaultProps = {
  onPress: () => null,
  buttonStyle: '',
  buttonTextStyle: '',
  text: '',
  img: 0,
};

export default buttonWithIcon;

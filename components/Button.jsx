import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import layout from '../constants/Layout';

const styles = StyleSheet.create(layout.styles);

const button = (props) => {
  const { disabled, onButtonPress, text } = props;

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onButtonPress} disabled={disabled}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

button.propTypes = {
  disabled: PropTypes.bool,
  onButtonPress: PropTypes.func,
  text: PropTypes.string,
};

button.defaultProps = {
  disabled: false,
  onButtonPress: () => null,
  text: '',
};

export default button;

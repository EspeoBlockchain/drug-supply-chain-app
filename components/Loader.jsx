import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import colors from '../constants/Colors';
import layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: layout.window.width,
    height: 50,
    backgroundColor: colors.registerLight,
    alignSelf: 'center',
    flex: 0,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const loader = () => (
  <View style={styles.container}>
    <ActivityIndicator
      animating
      color={colors.registerDark}
      size="large"
      style={styles.activityIndicator}
    />
  </View>
);

export default loader;

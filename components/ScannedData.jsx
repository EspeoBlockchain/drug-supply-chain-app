import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';

const styles = StyleSheet.create({
  data: {
    flex: 1,
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: colors.registerLight,
    padding: 20,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.main,
    fontSize: 16,
    marginBottom: 5,
  },
  table: {
    borderColor: colors.white,
    borderWidth: 2,
    borderBottomWidth: 0,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.white,
  },
  label: {
    width: 150,
    padding: 5,
    color: colors.white,
    fontFamily: fonts.main,
  },
  value: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 5,
    color: colors.white,
    borderLeftWidth: 2,
    borderColor: colors.white,
    fontFamily: fonts.main,
  },
});

const scannedData = (props) => {
  const { data } = props;

  const filteredData = Object.keys(data).map((item) => {
    let row = data[item] !== '' 
      ? row = (
        <View key={item} style={styles.row}>
          <Text style={styles.label}>
            {`${item}:`}
          </Text>
          <Text style={styles.value}>
            {data[item]}
          </Text>
        </View>
      )
      : null;
    return row;
  });

  return (
    <View style={styles.data}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your scanned data</Text>
        <View style={styles.table}>
          {filteredData}
        </View>
      </ScrollView>
    </View>
  );
};

scannedData.propTypes = {
  data: PropTypes.shape({
    drugItemId: PropTypes.string,
    address: PropTypes.string,
    participantCategory: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    temperature: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    transitCategory: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    privateKey: PropTypes.string,
    publicKey: PropTypes.string,
  }),
};

scannedData.defaultProps = {
  data: {},
};

export default scannedData;

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BarCodeScanner,
  Permissions,
} from 'expo';
import PropTypes from 'prop-types';
import layout from '../constants/Layout';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexBasis: layout.window.width + 65,
  },
  scannerContainer: {
    overflow: 'hidden',
    width: layout.window.width,
    height: layout.window.width,
  },
  scanner: {
    flex: 1,
  },
  title: {
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: colors.transportLight,
    color: colors.white,
    fontFamily: fonts.main,
    alignSelf: 'flex-start',
    width: '100%',
    borderColor: colors.transportDark,
    borderWidth: 2,
    zIndex: 1,
    fontSize: 20,
    height: 65,
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
    width: '100%',
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 2,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
    width: '100%',
  },
});

export default class QRCodeScreen extends PureComponent {
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { title, handleQRScan } = this.props;

    if (hasCameraPermission === null) {
      return <Text style={styles.title}>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text style={styles.title}>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleQRScan}
            style={styles.scanner}
          >
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </BarCodeScanner>
        </View>
      </View>
    );
  }
}

QRCodeScreen.propTypes = {
  title: PropTypes.string,
  handleQRScan: PropTypes.func,
};

QRCodeScreen.defaultProps = {
  title: '',
  handleQRScan: () => null,
};

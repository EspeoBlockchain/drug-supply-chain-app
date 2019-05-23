import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

const styles = StyleSheet.create({
  role: {
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default class QRCodeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    Alert.alert(
      'Scan finished',
      `Bar code with type ${type} and data ${data} has been scanned!`,
    );
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.role}>Hello!</Text>
      </View>
    );
  }
}

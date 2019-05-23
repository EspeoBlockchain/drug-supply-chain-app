import React, { PureComponent } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import scannerService from '../services/scannerService';
import ScannedData from '../components/ScannedData';
import layout from '../constants/Layout';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Web3Service from '../web3/service';

const styles = StyleSheet.create(layout.styles);

export default class VerifierScreen extends PureComponent {
  state = {
    drugItemId: '',
    scanner: true,
    loading: false,
    operationReady: false,
  }

  handleDrugItemScan = (scannedData) => {
    const result = scannerService.getDrugItemData(scannedData.data);
    if (!result) return;

    const newState = {
      drugItemId: result.drugItemId,
      scanner: false,
    };
    this.setState({
      ...newState,
      operationReady: true,
    });
  }

  onButtonPress = () => {
    const { drugItemId } = this.state;
    this.setState({
      loading: true,
    });

    Web3Service.verifyItem(
      drugItemId,
    )
      .then((res) => {
        Alert.alert(res);
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          err.message,
        );
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const {
      scanner,
      drugItemId,
      operationReady,
      loading,
    } = this.state;
    return (
      <View style={styles.container}>
        {scanner && <QRCodeScanner handleQRScan={this.handleDrugItemScan} title="Please scan your drug item" />}
        <ScannedData data={{ drugItemId }} />
        {loading && <Loader />}
        {operationReady && <Button text="Verify" onButtonPress={this.onButtonPress} disabled={loading} />}
      </View>
    );
  }
}

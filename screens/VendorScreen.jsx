import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import scannerService from '../services/scannerService';
import ScannedData from '../components/ScannedData';
import layout from '../constants/Layout';
import Web3Service from '../web3/service';
import Loader from '../components/Loader';
import Button from '../components/Button';

const styles = StyleSheet.create(layout.styles);

export default class VendorScreen extends Component {
  state = {
    packageData: {
      drugItemId: '',
      address: '',
      participantCategory: '',
      privateKey: '',
      publicKey: '',
    },
    loading: false,
    operationReady: false,
    currentScan: 'package',
  }

  displayAlert = (nextScan) => {
    const person = nextScan === 'keys' ? `private key for ${this.state.packageData.publicKey}` : nextScan;
    const message = nextScan ? `Prepare ${person} QR code` : 'You can now register drug item';
    const buttonText = nextScan ? 'Next scan' : 'OK';
    Alert.alert(
      'Scan completed',
      message,
      [
        {
          text: buttonText,
          onPress: () => { this.setState({ currentScan: nextScan }); },
        },
      ],
    );
  }

  handleScan = (scannedData, functionName, nextScan, operationReady) => {
    const { packageData } = this.state;
    const result = functionName(scannedData);
    if (!result) return;

    const newPackageData = scannerService.updateObject(
      packageData,
      result,
    );

    const newState = {
      packageData: newPackageData,
      currentScan: '',
      operationReady,
    };

    this.setState({
      ...newState,
    });

    this.displayAlert(nextScan);
  }

  onButtonPress = () => {
    const { packageData } = this.state;
    const {
      drugItemId,
      address,
      participantCategory,
      publicKey,
      privateKey,
    } = packageData;

    this.setState({
      loading: true,
    });
    Web3Service.addAccount(privateKey);

    Web3Service.registerInitialHandover(
      drugItemId,
      address,
      participantCategory,
      publicKey,
    )
      .then(() => {
        Alert.alert('Item successfully registered');
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          err.message,
        );
      })
      .finally(() => {
        Web3Service.removeAccount(privateKey);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const {
      loading,
      operationReady,
      currentScan,
      packageData,
    } = this.state;

    let scan = null;
    switch (currentScan) {
      case 'package':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedData) => { this.handleScan(scannedData.data, scannerService.getDrugItemData, 'carrier', false); }}
            title="Please scan your drug item"
          />
        );
        break;
      case 'carrier':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedData) => { this.handleScan(scannedData.data, scannerService.getReceiverData, 'keys', false); }}
            title="Please scan your receiver"
          />
        );
        break;
      case 'keys':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedData) => { this.handleScan(scannedData.data, scannerService.getKeysData, '', true); }}
            title="Please scan your keys"
          />
        );
        break;
      default:
        scan = null;
    }

    return (
      <View style={styles.container}>
        {scan}
        <ScannedData data={packageData} />
        {loading && <Loader />}
        {operationReady && <Button text="Register" onButtonPress={this.onButtonPress} />}
      </View>
    );
  }
}

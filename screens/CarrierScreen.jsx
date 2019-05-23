import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Web3Service from '../web3/service';
import QRCodeScanner from '../components/QRCodeScanner';
import scannerService from '../services/scannerService';
import ScannedData from '../components/ScannedData';
import layout from '../constants/Layout';
import Button from '../components/Button';
import Loader from '../components/Loader';

const styles = StyleSheet.create(layout.styles);

export default class CarrierScreen extends Component {
  state = {
    packageData: {
      drugItemId: '',
      address: '',
      participantCategory: '',
      temperature: '',
      transitCategory: '',
      privateKey: '',
      publicKey: '',
    },
    currentScan: 'package',
    loading: false,
    operationReady: false,
  }

  displayAlert = (nextScan) => {
    const person = nextScan === 'keys' ? `private key for ${this.state.packageData.publicKey}` : nextScan;
    const message = nextScan ? `Prepare ${person} QR code` : 'You can now register handover';
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

  handleScan = (data, functionName, nextScan, operationReady) => {
    const { packageData } = this.state;
    const result = functionName(data);
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
      temperature,
      transitCategory,
      publicKey,
      privateKey,
    } = packageData;

    this.setState({
      loading: true,
    });

    Web3Service.addAccount(privateKey);

    Web3Service.registerHandover(
      drugItemId,
      address,
      participantCategory,
      temperature,
      transitCategory,
      publicKey,
    )
      .then(() => {
        Alert.alert('Transport successfully registered');
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
      currentScan,
      packageData,
      operationReady,
      loading,
    } = this.state;
    let scan = null;

    switch (currentScan) {
      case 'package':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedObject) => { this.handleScan(scannedObject.data, scannerService.getDrugItemData, 'carrier', false); }}
            title="Please scan your drug item"
          />
        );
        break;
      case 'carrier':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedObject) => { this.handleScan(scannedObject.data, scannerService.getCarrierData, 'receiver', false); }}
            title="Please scan yourself"
          />
        );
        break;
      case 'receiver':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedObject) => { this.handleScan(scannedObject.data, scannerService.getReceiverData, 'keys', false); }}
            title="Please scan your receiver"
          />
        );
        break;
      case 'keys':
        scan = (
          <QRCodeScanner
            handleQRScan={(scannedObject) => { this.handleScan(scannedObject.data, scannerService.getKeysData, '', true); }}
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
        {operationReady && <Button text="Register" onButtonPress={this.onButtonPress} disabled={loading} />}
      </View>
    );
  }
}

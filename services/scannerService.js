class ScannerService {
  constructor() {
    this.participant = new Map([['carrier', 1], ['pharmacy', 2]]);
    this.transit = new Map([['Airplane', 1], ['Ship', 2], ['Truck', 3]]);
  }

  tryParseData = (data) => {
    let result = null;

    try {
      result = JSON.parse(data);
    } catch {
      alert('Invalid QR code');
    }

    return result;
  }

  validateObject = (obj, properties) => {
    let valid = true;
    properties.forEach((prop) => {
      valid = prop in obj && valid;
    });
    return valid;
  }

  getDrugItemData = (data) => {
    const result = this.tryParseData(data);
    if (!result) {
      alert('Invalid drug item QR code!');
      return;
    }

    const validObject = this.validateObject(result, ['id', 'expiryDate', 'vendor']);
    if (!validObject) {
      alert('Invalid drug item QR code!');
      return;
    }

    return {
      parsedData: {
        drugItemId: result.id,
        publicKey: result.vendor,
      },
      displayedData: {
        "Drug item id": result.id,
        "Vendor public key": result.vendor,
      },
    };
  }

  getCarrierData = (data) => {
    const result = this.tryParseData(data);
    if (!result) {
      alert('Invalid carrier QR code!');
      return;
    }

    const validObject = this.validateObject(result, ['carrier', 'category', 'temperature']);
    if (!validObject) {
      alert('Invalid carrier QR code!');
      return;
    }

    return {
      parsedData: {
        address: result.carrier,
        transitCategory: this.transit.get(result.category),
        temperature: result.temperature,
        publicKey: result.carrier,
      },
      displayedData: {
        "Carrier public key": result.carrier,
        "Transit": result.category,
        "Temperature": result.temperature,
      },
    };
  }

  getReceiverData = (data) => {
    const result = this.tryParseData(data);
    let type = '';
    if (!result) {
      alert('Invalid receiver (Carrier or Pharmacy) QR code!');
      return;
    }

    let validObject = this.validateObject(result, ['carrier', 'category', 'temperature']);
    if (validObject) {
      type = 'carrier';
      return {
        parsedData: {
          address: result[type],
          participantCategory: this.participant.get(type),
        },
        displayedData: {
          "Carrier public key": result[type],
          "Category": type
        },
      };
    }

    validObject = this.validateObject(result, ['pharmacy']);
    if (validObject) {
      type = 'pharmacy';
      return {
        parsedData: {
          address: result[type],
          participantCategory: this.participant.get(type),
        },
        displayedData: {
          "Pharmacy public key": result[type],
          "Category": type,
        },
      };
    }

    alert('Invalid receiver (Carrier or Pharmacy) QR code!');
    return null;
  }

  getKeysData = (data) => {
    const result = this.tryParseData(data);

    if (!result) {
      alert('Invalid keys QR code');
    }

    const validObject = this.validateObject(result, ['address', 'privateKey']);
    if (!validObject) {
      alert('Invalid keys QR code!');
      return;
    }

    return {
      parsedData: {
        privateKey: result.privateKey,
      },
      displayedData: {
        "Private key": "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },  
    };
  }

  updateObject = (previousObject, newValues) => {
    return {
      ...previousObject,
      ...newValues,
    };
  }
}

export default new ScannerService();

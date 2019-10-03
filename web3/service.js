import Web3 from 'web3';
import { abi } from './abi';
import { PROVIDER, ADDRESS, GAS_PRICE } from 'react-native-dotenv';

class Web3Service {
  constructor() {
    this.web3 = new Web3(this.httpProvider());
    this.web3.eth.defaultGas = 1000000;
    this.web3.eth.defaultGasPrice = parseInt(GAS_PRICE);
    this.web3.transactionConfirmationBlocks = 1;
    this.contract = this.newContract(abi, ADDRESS);
    this.drugStates = new Map([
      [100, 'Valid for purchase'],
      [200, 'Not in pharmacy'],
      [201, 'Too many handovers'],
      [202, 'Temperature too high'],
      [203, 'Temperature too low'],
      [204, 'Total transit time too long'],
      [205, 'Single transit time too long'],
    ]);
  }

  httpProvider() {
    throw new Error('Not implemented');
  }

  newContract(abi, address) {
    throw new Error('Not implemented');
  }

  addAccount(account) {
    this.web3.eth.accounts.wallet.add(account);
  }

  removeAccount(account) {
    this.web3.eth.accounts.wallet.remove(account);
  }

  convertUtf8ToBytes(str) {
    return this.web3.utils.hexToBytes(this.web3.utils.utf8ToHex(str));
  }

  registerInitialHandover(drugItemId, address, participantCategory, publicKey) {
    throw new Error('Not implemented');
  }

  registerHandover(
    drugItemId,
    address,
    participantCategory,
    temperature,
    transitCategory,
    publicKey,
  ) {
    const drugItemBytes = this.convertUtf8ToBytes(drugItemId);
    return this.contract.methods
      .registerHandover(drugItemBytes, address, participantCategory, temperature, transitCategory)
      .send({ from: publicKey });
  }

  async verifyItem(drugItemId) {
    const drugItemBytes = this.convertUtf8ToBytes(drugItemId);
    try {
      throw new Error('Not implemented');
      const uniqueCodes = [...new Set(codes)];
      return uniqueCodes.map(code => this.drugStates.get(code)).join('. ');
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new Web3Service();

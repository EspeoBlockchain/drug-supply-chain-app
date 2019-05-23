import Web3 from 'web3';
import { abi } from './abi';

const TEST_PROVIDER_URL = 'https://ropsten.infura.io/v3/da3111c149bb4134a9b3439392abe518';
const ADDRESS = '0x608bb1a6B271e27B55E3A913E6E349869DcF28A2';

class Web3Service {
  constructor() {
    this.web3 = new Web3(this.httpProvider());
    this.web3.eth.defaultGas = 1000000;
    this.web3.eth.defaultGasPrice = 2000000000;
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
    return new Web3.providers.HttpProvider(TEST_PROVIDER_URL);
  }

  newContract(abi, address) {
    return new this.web3.eth.Contract(abi, address);
  }

  addAccount(account) {
    this.web3.eth.accounts.wallet.add(account);
  }

  removeAccount(account) {
    this.web3.eth.accounts.wallet.remove(account);
  }

  convertUtf8ToBytes(str) {
    const shortVersion = str.replace(/-/g, '');
    return this.web3.utils.hexToBytes(this.web3.utils.utf8ToHex(shortVersion));
  }

  getGasPrice() {
    return this.web3.eth.getGasPrice();
  }

  getBlock(blockNo) {
    return this.web3.eth.getBlock(blockNo);
  }

  getTransactionCount() {
    return this.web3.eth.getTransactionCount(ADDRESS);
  }

  isVendor(vendorAddress) {
    return this.contract.methods.isVendor(vendorAddress).call();
  }

  registerInitialHandover(drugItemId, address, participantCategory, publicKey) {
    const drugItemBytes = this.convertUtf8ToBytes(drugItemId);
    return this.contract.methods
      .registerInitialHandover(drugItemBytes, address, participantCategory)
      .send({ from: publicKey });
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
    let result = '';
    try {
      const codes = await this.contract.methods
        .isPurchasable(drugItemBytes)
        .call();
      const uniqueCodes = [...new Set(codes)];

      uniqueCodes.forEach((code) => {
        result += `${this.drugStates.get(code)}. `;
      });
    } catch (err) {
      result = err;
    }
    return result;
  }
}

export default new Web3Service();

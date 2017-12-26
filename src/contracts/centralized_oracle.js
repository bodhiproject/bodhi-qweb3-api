import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

const CentralizedOracle = {
  bet: async function(args) {
    const {
      contractAddress, // address
      index, // number
      amount, // number (Satoshi)
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || index === undefined || amount === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, index, amount, and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
    return await oracle.send('bet', {
      methodArgs: [index],
      amount: amount,
      senderAddress: senderAddress,
    });
  },

  setResult: async function(args) {
    const {
      contractAddress, // address
      resultIndex, // number
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || resultIndex === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, resultIndex, and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
    return await oracle.send('setResult', {
      methodArgs: [resultIndex],
      gasLimit: 4000000,
      senderAddress: senderAddress,
    });
  },

  oracle: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
    return await oracle.call('oracle', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  bettingEndBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
    return await oracle.call('bettingEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  resultSettingEndBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
    return await oracle.call('resultSettingEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

module.exports = CentralizedOracle;

import Config from '../../config/config';
import Contracts from '../../config/contracts';
const Contract = require('qweb3/src/contract');

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

    const contract = getContract(contractAddress);
    return await contract.send('bet', {
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

    const contract = getContract(contractAddress);
    return await contract.send('setResult', {
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

    const contract = getContract(contractAddress);
    return await contract.call('oracle', {
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

    const contract = getContract(contractAddress);
    return await contract.call('bettingEndBlock', {
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

    const contract = getContract(contractAddress);
    return await contract.call('resultSettingEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getContract(contractAddress) {
  return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, Contracts.CentralizedOracle.abi);
}

module.exports = CentralizedOracle;

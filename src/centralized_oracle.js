import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../config/config';
import ContractMetadata from '../config/contract_metadata';

const GAS_LIMIT_SET_RESULT = 4000000;

const CentralizedOracle = {
  bet: async function(args) {
    const {
      contractAddress, // address
      index, // number
      amount, // number (Satoshi)
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(index)) {
      throw new TypeError('index needs to be defined');
    }
    if (_.isUndefined(amount)) {
      throw new TypeError('amount needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
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

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(resultIndex)) {
      throw new TypeError('resultIndex needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.send('setResult', {
      methodArgs: [resultIndex],
      gasLimit: GAS_LIMIT_SET_RESULT,
      senderAddress: senderAddress,
    });
  },

  oracle: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.call('oracle', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  bettingStartBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.call('bettingStartBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  bettingEndBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.call('bettingEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  resultSettingStartBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.call('resultSettingStartBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  resultSettingEndBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.call('resultSettingEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getContract(contractAddress) {
  return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, ContractMetadata.CentralizedOracle.abi);
}

module.exports = CentralizedOracle;

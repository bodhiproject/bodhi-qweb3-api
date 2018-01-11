import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../config/config';
import ContractMetadata from '../config/contract_metadata';

const BaseContract = {
  version: async function(args) {
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
    return await contract.call('version', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  resultIndex: async function(args) {
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
    return await contract.call('resultIndex', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
  
  getBetBalances: async function(args) {
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
    return await contract.call('getBetBalances', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getVoteBalances: async function(args) {
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
    return await contract.call('getVoteBalances', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getTotalBets: async function(args) {
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
    return await contract.call('getTotalBets', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getTotalVotes: async function(args) {
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
    return await contract.call('getTotalVotes', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getContract(contractAddress) {
  return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, ContractMetadata.BaseContract.abi);
}

module.exports = BaseContract;

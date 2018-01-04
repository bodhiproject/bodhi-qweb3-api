import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../../config/config';
import Contracts from '../../config/contracts';

const TopicEvent = {
  withdrawWinnings: async function(args) {
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
    return await contract.send('withdrawWinnings', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  status: async function(args) {
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
    return await contract.call('status', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  didWithdraw: async function(args) {
    const {
      contractAddress, // address
      address, // address
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(address)) {
      throw new TypeError('address needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const contract = getContract(contractAddress);
    return await contract.call('didWithdraw', {
      methodArgs: [address],
      senderAddress: senderAddress,
    });
  },

  calculateQtumWinnings: async function(args) {
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
    return await contract.call('calculateQtumContributorWinnings', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  calculateBotWinnings: async function(args) {
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
    return await contract.call('calculateBotContributorWinnings', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getContract(contractAddress) {
  return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, Contracts.TopicEvent.abi);
}

module.exports = TopicEvent;

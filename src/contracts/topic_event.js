import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Contract = require('..modules/qweb3/src/contract');

const TopicEvent = {
  withdrawWinnings: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || address === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, address, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
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

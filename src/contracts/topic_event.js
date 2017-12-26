import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

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

    const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
    return await topicEvent.send('withdrawWinnings', {
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

    const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
    return await topicEvent.call('status', {
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

    const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
    return await topicEvent.call('didWithdraw', {
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

    const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
    return await topicEvent.call('calculateQtumContributorWinnings', {
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

    const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
    return await topicEvent.call('calculateBotContributorWinnings', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

module.exports = TopicEvent;

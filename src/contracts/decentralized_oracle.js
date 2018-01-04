import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../../config/config';
import Contracts from '../../config/contracts';

const GAS_LIMIT_VOTE = 2000000;

const DecentralizedOracle = {
  vote: async function(args) {
    const {
      contractAddress, // address
      resultIndex, // number
      botAmount, // number (Botoshi)
      gasLimit, // number
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(resultIndex)) {
      throw new TypeError('resultIndex needs to be defined');
    }
    if (_.isUndefined(botAmount)) {
      throw new TypeError('botAmount needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    // If gasLimit is not specified, we need to make sure the vote succeeds in the event this vote will surpass the
    // consensus threshold and will require a higher gas limit.
    const contract = getContract(contractAddress);
    return await contract.send('voteResult', {
      methodArgs: [resultIndex, botAmount],
      gasLimit: gasLimit || GAS_LIMIT_VOTE,
      senderAddress: senderAddress,
    });
  },

  finalizeResult: async function(args) {
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
    return await contract.send('finalizeResult', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  arbitrationEndBlock: async function(args) {
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
    return await contract.call('arbitrationEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  lastResultIndex: async function(args) {
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
    return await contract.call('lastResultIndex', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getContract(contractAddress) {
  return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, Contracts.DecentralizedOracle.abi);
}

module.exports = DecentralizedOracle;

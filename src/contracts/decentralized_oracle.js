import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

const DecentralizedOracle = {
  vote: async function(args) {
    const {
      contractAddress, // address
      resultIndex, // number
      botAmount, // number (Botoshi)
      gasLimit, // number
      senderAddress, // address
    } = args;

    if (contractAddress === undefined
      || resultIndex === undefined
      || botAmount === undefined
      || senderAddress === undefined)
    {
      throw new TypeError('contractAddress, resultIndex, botAmount, and senderAddress need to be defined');
      return;
    }

    // If gasLimit is not specified, we need to make sure the vote succeeds in the event this vote will surpass the
    // consensus threshold and will require a higher gas limit.
    const defaultGasLimit = 2000000;

    const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
    return await oracle.send('voteResult', {
      methodArgs: [resultIndex, botAmount],
      gasLimit: gasLimit || defaultGasLimit,
      senderAddress: senderAddress,
    });
  },

  finalizeResult: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
    return await oracle.send('finalizeResult', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  arbitrationEndBlock: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
    return await oracle.call('arbitrationEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  lastResultIndex: async function(args) {
    const {
      contractAddress, // address
      senderAddress, // address
    } = args;

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
    }

    const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
    return await oracle.call('lastResultIndex', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

module.exports = DecentralizedOracle;

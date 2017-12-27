import Config from '../../config/config';
import Contracts from '../../config/contracts';
const Contract = require('qweb3/src/contract');

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

    const contract = getContract(contractAddress);
    return await contract.send('voteResult', {
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

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress and senderAddress need to be defined');
      return;
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

import Config from '../../config/config';
import Contracts from '../../config/contracts';
const Contract = require('qweb3/src/contract');

const BodhiToken = {
  approve: async function(args) {
    const {
      spender, // address
      value, // number (Botoshi)
      senderAddress, // address
    } = args;

    if (spender === undefined || value === undefined || senderAddress === undefined) {
      throw new TypeError('spender, value, and senderAddress need to be defined');
      return;
    }

    const contract = getContract();
    return await contract.send('approve', {
      methodArgs: [spender, value],
      senderAddress: senderAddress,
    });
  },

  allowance: async function(args) {
    const {
      owner, // address
      spender, // address
      senderAddress, // address
    } = args;

    if (owner === undefined || spender === undefined || senderAddress === undefined) {
      throw new TypeError('owner, spender, and senderAddress need to be defined');
      return;
    }

    const contract = getContract();
    return await contract.call('allowance', {
      methodArgs: [owner, spender],
      senderAddress: senderAddress,
    });
  },

  balanceOf: async function(args) {
    const {
      owner, // address
      senderAddress, // address
    } = args;

    if (owner === undefined || senderAddress === undefined) {
      throw new TypeError('owner and senderAddress need to be defined');
      return;
    }

    const contract = getContract();
    return await contract.call('balanceOf', {
      methodArgs: [owner],
      senderAddress: senderAddress,
    });
  },
};

function getContract() {
  return new Contract(Config.QTUM_RPC_ADDRESS, Contracts.BodhiToken.address, Contracts.BodhiToken.abi);
}

module.exports = BodhiToken;

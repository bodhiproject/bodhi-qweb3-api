import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

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

    const oracle = new qweb3.Contract(Contracts.BodhiToken.address, Contracts.BodhiToken.abi);
    return await oracle.send('approve', {
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

    const oracle = new qweb3.Contract(Contracts.BodhiToken.address, Contracts.BodhiToken.abi);
    return await oracle.call('allowance', {
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

    const oracle = new qweb3.Contract(Contracts.BodhiToken.address, Contracts.BodhiToken.abi);
    return await oracle.call('balanceOf', {
      methodArgs: [owner],
      senderAddress: senderAddress,
    });
  },
};

module.exports = BodhiToken;

import _ from 'lodash';
import Contract from 'qweb3/dist/contract';

import Config from '../../config/config';
import Contracts from '../../config/contracts';

const contract = new Contract(Config.QTUM_RPC_ADDRESS, Contracts.BodhiToken.address, Contracts.BodhiToken.abi);

const BodhiToken = {
  approve: async function(args) {
    const {
      spender, // address
      value, // number (Botoshi)
      senderAddress, // address
    } = args;

    if (_.isUndefined(spender)) {
      throw new TypeError('spender needs to be defined');
    }
    if (_.isUndefined(value)) {
      throw new TypeError('value needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

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

    if (_.isUndefined(owner)) {
      throw new TypeError('owner needs to be defined');
    }
    if (_.isUndefined(spender)) {
      throw new TypeError('spender needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

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

    if (_.isUndefined(owner)) {
      throw new TypeError('owner needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    return await contract.call('balanceOf', {
      methodArgs: [owner],
      senderAddress: senderAddress,
    });
  },
};

module.exports = BodhiToken;

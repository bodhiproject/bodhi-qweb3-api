import _ from 'lodash';
import { Qweb3 } from 'qweb3';

import Config from '../../config/config';

const qClient = new Qweb3(Config.QTUM_RPC_ADDRESS);

const Wallet = {
  getAccountAddress: async function(args) {
    const {
      accountName, // string
    } = args;

    if (_.isUndefined(accountName)) {
      throw new TypeError('accountName needs to be defined');
    }

    return await qClient.getAccountAddress(accountName);
  },

  listUnspent: async function() {
    return await qClient.listUnspent();
  },
};

module.exports = Wallet;

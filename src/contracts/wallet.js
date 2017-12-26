import Config from '../../config/config';

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

const Wallet = {
  listUnspent: async function() {
    return await qweb3.listUnspent();
  },
};

module.exports = Wallet;

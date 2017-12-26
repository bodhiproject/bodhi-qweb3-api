import Config from '../../config/config';
const Qweb3 = require('../modules/qweb3');

const qClient = new Qweb3(Config.QTUM_RPC_ADDRESS);

const Wallet = {
  listUnspent: async function() {
    return await qClient.listUnspent();
  },
};

module.exports = Wallet;

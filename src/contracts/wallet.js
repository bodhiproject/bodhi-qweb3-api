import Config from '../../config/config';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function listUnspent() {
  return await qweb3.listUnspent();
}

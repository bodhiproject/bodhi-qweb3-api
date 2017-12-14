import Config from '../../config/config';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function getBlockCount() {
  return await qweb3.getBlockCount();
}

export async function getTransactionReceipt(args) {
  const { 
    transactionId, 
  } = args;

  if (!transactionId) { 
    throw new TypeError('transactionId is undefined');
  }

  return await qweb3.getTransactionReceipt(transactionId);
}

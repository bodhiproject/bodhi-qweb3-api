import Config from '../../config/config';

const Qweb3 = require('../modules/qweb3/index');
const qweb3Client = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function getBlockCount() {
  return await qweb3Client.getBlockCount();
}

export async function getTransactionReceipt(args) {
  const { 
    transactionId, // string
  } = args;

  if (transactionId === undefined) { 
    throw new TypeError('transactionId need to be defined');
  }

  return await qweb3Client.getTransactionReceipt(transactionId);
}

export async function searchLogs(args) {
  let {
    fromBlock, // number
    toBlock, // number
    addresses, // string array
    topics // string array
  } = args;

  if (fromBlock === undefined || toBlock === undefined) {
    throw new TypeError('fromBlock and toBlock need to be defined');
  }

  if (addresses === undefined) {
    addresses = [];
  }

  if (topics === undefined) {
    topics = [];
  }

  return await qweb3Client.searchLogs(fromBlock, toBlock, addresses, topics);
}
import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function getBlockCount() {
  return await qweb3.getBlockCount();
}

export async function getTransactionReceipt(args) {
  const { 
    transactionId, // string
  } = args;

  if (transactionId === undefined) { 
    throw new TypeError('transactionId need to be defined');
  }

  return await qweb3.getTransactionReceipt(transactionId);
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

  const contract = new qweb3.Contract(Contracts.BodhiToken.address, Contracts.BodhiToken.abi);
  return await contract.searchLogs(fromBlock, toBlock, addresses, topics);
}
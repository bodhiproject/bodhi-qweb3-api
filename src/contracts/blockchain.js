import Config from '../../config/config';

const ContractMetadata = require('./contract_metadata');
const Qweb3 = require('qweb3');
const qweb3Client = new Qweb3(Config.QTUM_RPC_ADDRESS);

const Blockchain = {
  getBlockCount: async function() {
    return await qweb3Client.getBlockCount();
  },

  getTransactionReceipt: async function(args) {
    const {
      transactionId, // string
    } = args;

    if (transactionId === undefined) {
      throw new TypeError('transactionId need to be defined');
    }

    return await qweb3Client.getTransactionReceipt(transactionId);
  },

  searchLogs: async function(args) {
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

    return await qweb3Client.searchLogs(fromBlock, toBlock, addresses, topics, ContractMetadata, true);
  }
};

module.exports = Blockchain;
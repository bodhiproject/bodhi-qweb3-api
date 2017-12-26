import Config from '../../config/config';
const ContractMetadata = require('./contract_metadata');
const Qweb3 = require('../modules/qweb3');

const qClient = new Qweb3(Config.QTUM_RPC_ADDRESS);

const Blockchain = {
  getBlockCount: async function() {
    return await qClient.getBlockCount();
  },

  getTransactionReceipt: async function(args) {
    const {
      transactionId, // string
    } = args;

    if (transactionId === undefined) {
      throw new TypeError('transactionId need to be defined');
    }

    return await qClient.getTransactionReceipt(transactionId);
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

    return await qClient.searchLogs(fromBlock, toBlock, addresses, topics, ContractMetadata, true);
  }
};

module.exports = Blockchain;

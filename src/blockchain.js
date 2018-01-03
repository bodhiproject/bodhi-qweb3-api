import _ from 'lodash';
import Qweb3 from 'qweb3';

import Config from '../config/config';
import ContractMetadata from '../config/contract_metadata';

const qClient = new Qweb3(Config.QTUM_RPC_ADDRESS);

const Blockchain = {
  getBlockCount: async function() {
    return await qClient.getBlockCount();
  },

  getTransactionReceipt: async function(args) {
    const {
      transactionId, // string
    } = args;

    if (_.isUndefined(transactionId)) {
      throw new TypeError('transactionId needs to be defined');
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

    if (_.isUndefined(fromBlock)) {
      throw new TypeError('fromBlock needs to be defined');
    }
    if (_.isUndefined(toBlock)) {
      throw new TypeError('toBlock needs to be defined');
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

import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../config/config';
import ContractMetadata from '../config/contract_metadata';

const ORACLE_CENTRALIZED = 'centralized';
const ORACLE_DECENTRALIZED = 'decentralized';

const Oracle = {
  eventAddress: async function(args) {
    const {
      contractAddress, // address
      oracleType, // string
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(oracleType)) {
      throw new TypeError('oracleType needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const oracle = getContract(oracleType, contractAddress);
    return await oracle.call('eventAddress', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  consensusThreshold: async function(args) {
    const {
      contractAddress, // address
      oracleType, // string
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(oracleType)) {
      throw new TypeError('oracleType needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const oracle = getContract(oracleType, contractAddress);
    return await oracle.call('consensusThreshold', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  finished: async function(args) {
    const {
      contractAddress, // address
      oracleType, // string
      senderAddress, // address
    } = args;

    if (_.isUndefined(contractAddress)) {
      throw new TypeError('contractAddress needs to be defined');
    }
    if (_.isUndefined(oracleType)) {
      throw new TypeError('oracleType needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    const oracle = getContract(oracleType, contractAddress);
    return await oracle.call('finished', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getContract(oracleType, contractAddress) {
  switch (oracleType) {
    case ORACLE_CENTRALIZED: {
      return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, ContractMetadata.CentralizedOracle.abi);
    }
    case ORACLE_DECENTRALIZED: {
      return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, ContractMetadata.DecentralizedOracle.abi);
    }
    default: {
      throw new TypeError('Invalid oracle type');
    }
  }
}

module.exports = Oracle;

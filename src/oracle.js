import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../config/config';
import ContractMetadata from '../config/contract_metadata';

const ORACLE_CENTRALIZED = 'centralized';
const ORACLE_DECENTRALIZED = 'decentralized';
const GAS_LIMIT_INVALIDATE_ORACLE = 3000000;

const Oracle = {
  invalidateOracle: async function(args) {
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
    return await oracle.send('invalidateOracle', {
      methodArgs: [],
      gasLimit: GAS_LIMIT_INVALIDATE_ORACLE,
      senderAddress: senderAddress,
    });
  },

  getBetBalances: async function(args) {
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
    return await oracle.call('getBetBalances', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getVoteBalances: async function(args) {
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
    return await oracle.call('getVoteBalances', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getTotalBets: async function(args) {
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
    return await oracle.call('getTotalBets', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getTotalVotes: async function(args) {
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
    return await oracle.call('getTotalVotes', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },

  getResult: async function(args) {
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
    return await oracle.call('getResult', {
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

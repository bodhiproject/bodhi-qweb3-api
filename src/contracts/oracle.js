import Config from '../../config/config';
import Contracts from '../../config/contracts';
const Contract = require('qweb3/src/contract');

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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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

    if (contractAddress === undefined || oracleType === undefined || senderAddress === undefined) {
      throw new TypeError('contractAddress, oracleType, and senderAddress need to be defined');
      return;
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
      return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, Contracts.CentralizedOracle.abi);
    }
    case ORACLE_DECENTRALIZED: {
      return new Contract(Config.QTUM_RPC_ADDRESS, contractAddress, Contracts.DecentralizedOracle.abi);
    }
    default: {
      throw new TypeError('Invalid oracle type');
    }
  }
}

module.exports = Oracle;

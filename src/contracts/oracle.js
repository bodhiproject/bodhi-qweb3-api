import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

const ORACLE_CENTRALIZED = 'centralized';
const ORACLE_DECENTRALIZED = 'decentralized';

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

    const oracle = getOracleContract(oracleType, contractAddress);
    return await oracle.send('invalidateOracle', {
      methodArgs: [],
      gasLimit: 3000000,
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

    const oracle = getOracleContract(oracleType, contractAddress);
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

    const oracle = getOracleContract(oracleType, contractAddress);
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

    const oracle = getOracleContract(oracleType, contractAddress);
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

    const oracle = getOracleContract(oracleType, contractAddress);
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

    const oracle = getOracleContract(oracleType, contractAddress);
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

    const oracle = getOracleContract(oracleType, contractAddress);
    return await oracle.call('finished', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
  },
};

function getOracleContract(oracleType, contractAddress) {
  switch (oracleType) {
    case ORACLE_CENTRALIZED: {
      return new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
    }
    case ORACLE_DECENTRALIZED: {
      return new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
    }
    default: {
      throw new TypeError('Invalid oracle type');
    }
  }
}

module.exports = Oracle;

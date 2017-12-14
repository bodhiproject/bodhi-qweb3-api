import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function bet(args) {
  const { 
    contractAddress,
    index, 
    amount, 
    senderAddress,
  } = args;

  if (contractAddress === undefined || index === undefined || amount === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress, index, amount, and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.send('bet', {
    methodArgs: [index],
    amount: amount,
    senderAddress: senderAddress,
  });
}

export async function setResult(args) {
  const { 
    contractAddress,
    resultIndex, 
    senderAddress,
  } = args;

  if (contractAddress === undefined || resultIndex === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress, resultIndex, and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.send('setResult', {
    methodArgs: [resultIndex],
    gasLimit: 3000000,
    senderAddress: senderAddress,
  });
}

export async function getBetBalances(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.call('getBetBalances', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function getVoteBalances(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.call('getVoteBalances', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function getTotalBets(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.call('getTotalBets', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

export async function getTotalVotes(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.call('getTotalVotes', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function getResult(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.call('getResult', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function finished(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.CentralizedOracle.abi);
  return await oracle.call('finished', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
}

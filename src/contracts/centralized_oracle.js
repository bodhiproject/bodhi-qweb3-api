import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function bet(args) {
  const { 
    index, 
    amount, 
    senderAddress,
  } = args;

  if (index === undefined || amount === undefined) {
    res.send(500, 'Both index and amount needs to be defined.');
    return;
  }

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.send('bet', {
    methodArgs: [index],
    amount: amount,
    senderAddress: senderAddress,
  });
}

export async function getBetBalances(args) {
  const { 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.call('getBetBalances', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function getVoteBalances(args) {
  const { 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.call('getVoteBalances', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function getTotalBets(args) {
  const { 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.call('getTotalBets', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

export async function getTotalVotes(args) {
  const { 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.call('getTotalVotes', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function getResult(args) {
  const { 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.call('getResult', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function finished(args) {
  const { 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.call('finished', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
}

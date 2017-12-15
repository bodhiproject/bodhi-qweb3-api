import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function vote(args) {
  const { 
    contractAddress,
    resultIndex, 
    botAmount, 
    senderAddress,
  } = args;

  if (contractAddress === undefined 
    || resultIndex === undefined 
    || botAmount === undefined 
    || senderAddress === undefined) 
  {
    throw new TypeError('contractAddress, resultIndex, botAmount, and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
  return await oracle.send('voteResult', {
    methodArgs: [resultIndex, botAmount],
    gasLimit: 2000000,
    senderAddress: senderAddress,
  });
}

export async function finalizeResult(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
  return await oracle.send('finalizeResult', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function arbitrationEndBlock(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const oracle = new qweb3.Contract(contractAddress, Contracts.DecentralizedOracle.abi);
  return await oracle.call('arbitrationEndBlock', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
}

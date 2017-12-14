import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function withdrawWinnings(args) {
  const { 
    contractAddress,
    senderAddress,
  } = args;

  if (contractAddress === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress and senderAddress need to be defined');
    return;
  }

  const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
  return await topicEvent.send('withdrawWinnings', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function didWithdraw(args) {
  const { 
    contractAddress,
    address,
    senderAddress,
  } = args;

  if (contractAddress === undefined || address === undefined || senderAddress === undefined) {
    throw new TypeError('contractAddress, address, and senderAddress need to be defined');
    return;
  }

  const topicEvent = new qweb3.Contract(contractAddress, Contracts.TopicEvent.abi);
  return await topicEvent.call('didWithdraw', {
    methodArgs: [address],
    senderAddress: senderAddress,
  });
}

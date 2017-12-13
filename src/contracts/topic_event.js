import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function withdrawWinnings(args) {
  const { 
    senderAddress,
  } = args;

  const topicEvent = new qweb3.Contract(Contracts.TopicEvent.address, Contracts.TopicEvent.abi);
  return await topicEvent.send('withdrawWinnings', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
}

export async function didWithdraw(args) {
  const { 
    address,
    senderAddress,
  } = args;

  const topicEvent = new qweb3.Contract(Contracts.TopicEvent.address, Contracts.TopicEvent.abi);
  return await topicEvent.call('didWithdraw', {
    methodArgs: [address],
    senderAddress: senderAddress,
  });
}

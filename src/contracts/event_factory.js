import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function createTopic(args) {
  const { 
    oracleAddress, 
    eventName, 
    resultNames, 
    bettingEndBlock, 
    resultSettingEndBlock,
    senderAddress,
  } = args;

  const eventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);
  return await eventFactory.send('createTopic', {
    methodArgs: [oracleAddress, eventName, resultNames, bettingEndBlock, resultSettingEndBlock],
    gasLimit: 5000000,
    senderAddress: senderAddress,
  });
}

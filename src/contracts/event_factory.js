import Contracts from '../../config/contracts';

export async function createTopic(qweb3, args) {
  const { 
    oracleAddress, 
    eventName, 
    resultNames, 
    bettingEndBlock, 
    resultSettingEndBlock,
    senderAddress,
  } = args;

  console.log('createTopic');
  const eventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);
  return await eventFactory.send('createTopic', {
    methodArgs: [oracleAddress, eventName, resultNames, bettingEndBlock, resultSettingEndBlock],
    gasLimit: 5000000,
    senderAddress: senderAddress,
  });
}

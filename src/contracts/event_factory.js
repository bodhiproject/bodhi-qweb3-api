import Config from '../../config/config';
import Contracts from '../../config/contracts';
const Contract = require('qweb3/src/contract');

const GAS_LIMIT_CREATE_TOPIC = 5000000;

const contract = new Contract(Config.QTUM_RPC_ADDRESS, Contracts.EventFactory.address, Contracts.EventFactory.abi);

const EventFactory = {
  createTopic: async function(args) {
    const {
      oracleAddress, // address
      eventName, // string
      resultNames, // array
      bettingEndBlock, // number
      resultSettingEndBlock, // number
      senderAddress, // address
    } = args;

    if (oracleAddress === undefined
      || eventName === undefined
      || resultNames === undefined
      || bettingEndBlock === undefined
      || resultSettingEndBlock === undefined
      || senderAddress === undefined)
    {
      throw new TypeError('oracleAddress, eventName, resultNames, bettingEndBlock, resultSettingEndBlock, and senderAddress need to be defined');
      return;
    }

    return await contract.send('createTopic', {
      methodArgs: [oracleAddress, eventName, resultNames, bettingEndBlock, resultSettingEndBlock],
      gasLimit: GAS_LIMIT_CREATE_TOPIC,
      senderAddress: senderAddress,
    });
  }
};

module.exports = EventFactory;

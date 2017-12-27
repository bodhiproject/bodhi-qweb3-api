import Config from '../../config/config';
import Contracts from '../../config/contracts';
const Contract = require('qweb3/src/contract');

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

    const contract = getContract();
    return await contract.send('createTopic', {
      methodArgs: [oracleAddress, eventName, resultNames, bettingEndBlock, resultSettingEndBlock],
      gasLimit: 5000000,
      senderAddress: senderAddress,
    });
  }
};

function getContract() {
  return new Contract(Config.QTUM_RPC_ADDRESS, Contracts.EventFactory.address, Contracts.EventFactory.abi);
}

module.exports = EventFactory;

import Config from '../../config/config';
import Contracts from '../../config/contracts';

const utils = require('qweb3/src/utils');

const Qweb3 = require('qweb3');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

/** @type {number} Length of string of eventName */
const EVENTNAME_STR_LENGTH = 32;

/** @type {number} Max capacity of eventName array */
const EVENTNAME_ARRAY_CAPACITY = 10;

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

    // Break eventName into 10 strings of 64 chars
    let eventNameStringArray = utils.chunkString(eventName, EVENTNAME_STR_LENGTH).slice(0, EVENTNAME_ARRAY_CAPACITY);

    const eventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);
    return await eventFactory.send('createTopic', {
      methodArgs: [oracleAddress, eventNameStringArray, resultNames, bettingEndBlock, resultSettingEndBlock],
      gasLimit: 5000000,
      senderAddress: senderAddress,
    });
  }
};

module.exports = EventFactory;

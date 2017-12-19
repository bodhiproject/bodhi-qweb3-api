import Config from '../../config/config';
import Contracts from '../../config/contracts';
import utils from '../modules/qweb3/src/utils';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

/** @type {number} Length of string of eventName */
const EVENTNAME_STR_LENGTH = 32;

/** @type {number} Max capacity of eventName array */
const EVENTNAME_ARRAY_CAPACITY = 10;

export async function createTopic(args) {
  const { 
    oracleAddress, 
    eventName, // string
    resultNames, // array
    bettingEndBlock, 
    resultSettingEndBlock,
    senderAddress,
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

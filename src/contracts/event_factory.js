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

  // Break eventName into string arrays with max length of 64
  let eventNameStringArray = [];
  let maxArrayLength = 10;
  let arrayCapacity = 32 * 2; // 32 bytes times 2 hex character

  let currentIdx = 0;
  let lastIdx = eventName.length - 1;

  while (currentIdx < lastIdx) {
    console.log("currentIdx is " + currentIdx);
    let subStr;
    let endIdx;

    if (currentIdx + arrayCapacity <= lastIdx) {
      endIdx = currentIdx + arrayCapacity;
      subStr = eventName.slice(currentIdx, endIdx);
    } else {
      endIdx = lastIdx;
      subStr = eventName.slice(currentIdx);
    }

    // _.padEnd(subStr, arrayCapacity, '0');

    currentIdx = endIdx;

    // Push hex string to name array.
    // Break the loop if max array length is reached
    if (eventNameStringArray.length < maxArrayLength) {
      eventNameStringArray.push('0x' + subStr);
    } else {
      console.log("Name array reach max length " + maxArrayLength);
      break;
    }
  }

  const eventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);
  return await eventFactory.send('createTopic', {
    methodArgs: [oracleAddress, eventNameStringArray, resultNames, bettingEndBlock, resultSettingEndBlock],
    gasLimit: 5000000,
    senderAddress: senderAddress,
  });
}

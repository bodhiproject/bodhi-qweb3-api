import _ from 'lodash';
import { Contract } from 'qweb3';

import Config from '../../config/config';
import Contracts from '../../config/contracts';

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

    if (_.isUndefined(oracleAddress)) {
      throw new TypeError('oracleAddress needs to be defined');
    }
    if (_.isUndefined(eventName)) {
      throw new TypeError('eventName needs to be defined');
    }
    if (_.isUndefined(resultNames)) {
      throw new TypeError('resultNames needs to be defined');
    }
    if (_.isUndefined(bettingEndBlock)) {
      throw new TypeError('bettingEndBlock needs to be defined');
    }
    if (_.isUndefined(resultSettingEndBlock)) {
      throw new TypeError('resultSettingEndBlock needs to be defined');
    }
    if (_.isUndefined(senderAddress)) {
      throw new TypeError('senderAddress needs to be defined');
    }

    return await contract.send('createTopic', {
      methodArgs: [oracleAddress, eventName, resultNames, bettingEndBlock, resultSettingEndBlock],
      gasLimit: GAS_LIMIT_CREATE_TOPIC,
      senderAddress: senderAddress,
    });
  }
};

module.exports = EventFactory;

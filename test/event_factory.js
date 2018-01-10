import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';

import EventFactory from '../src/event_factory';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;

describe('EventFactory', function() {

  describe('createTopic()', async function() {
    it('returns a tx receipt', async function() {
      const res = await EventFactory.createTopic({
        oracleAddress: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
        eventName: 'The quick brown fox jumped over the lazy dog?',
        resultNames: ['yes', 'no'],
        bettingStartBlock: 65815,
        bettingEndBlock: 65835,
        resultSettingStartBlock: 65836,
        resultSettingEndBlock: 66000,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });
  });
});

import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import TopicEvent from '../src/topic_event';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('TopicEvent', function() {

  describe('withdrawWinnings()', function() {
    const contractAddress = 'ec1c7a01c24b97dd26611c31733ee36365f8a485';

    it('returns a tx receipt', async function() {
      const res = await TopicEvent.withdrawWinnings({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(TopicEvent.withdrawWinnings({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(TopicEvent.withdrawWinnings({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('status()', function() {
    const contractAddress = 'ec1c7a01c24b97dd26611c31733ee36365f8a485';

    it('returns the status', async function() {
      const res = await TopicEvent.status({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(TopicEvent.status({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(TopicEvent.status({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('didWithdraw()', function() {
    const contractAddress = 'ec1c7a01c24b97dd26611c31733ee36365f8a485';
    const address = 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy';
    
    it('returns the didWithdraw flag', async function() {
      const res = await TopicEvent.didWithdraw({
        contractAddress: contractAddress,
        address: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isBoolean(res[0]);
    });

    it('throws if contractAddress is undefined', async function() {
      expect(TopicEvent.didWithdraw({
        address: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if address is undefined', async function() {
      expect(TopicEvent.didWithdraw({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(TopicEvent.didWithdraw({
        contractAddress: contractAddress,
        address: address,
      })).to.be.rejectedWith(Error);
    });
  });
});

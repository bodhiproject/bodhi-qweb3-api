import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';
import { Decoder } from 'qweb3';

import CentralizedOracle from '../src/centralized_oracle.js';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';
import Mocks from './mock/centralized_oracle';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('CentralizedOracle', function() {
  const address = 'd78f96ea55ad0c8a283b6d759f39cda34a7c5b10';

  describe('bet()', function() {
    it('returns a tx receipt', function() {
      const res = Mocks.bet.result;
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.bet({
        index: 1,
        amount: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if index is undefined', function() {
      expect(CentralizedOracle.bet({
        contractAddress: address,
        amount: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if amount is undefined', function() {
      expect(CentralizedOracle.bet({
        contractAddress: address,
        index: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.bet({
        contractAddress: address,
        index: 1,
        amount: 1,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('setResult()', function() {
    it('returns a tx receipt', function() {
      const res = Mocks.setResult.result;
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.setResult({
        resultIndex: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if resultIndex is undefined', function() {
      expect(CentralizedOracle.setResult({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.setResult({
        contractAddress: address,
        resultIndex: 1,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('oracle()', function() {
    it('returns the oracle', function() {
      const res = Mocks.oracle.result;
      assert.isDefined(res[0]);
      assert.isTrue(Decoder.toQtumAddress(res[0]).startsWith('q'));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.oracle({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.oracle({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('bettingStartBlock()', function() {
    it('returns the bettingStartBlock', function() {
      const res = Mocks.bettingStartBlock.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.bettingStartBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.bettingStartBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('bettingEndBlock()', function() {
    it('returns the bettingEndBlock', function() {
      const res = Mocks.bettingEndBlock.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.bettingEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.bettingEndBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultSettingStartBlock()', function() {
    it('returns the resultSettingStartBlock', function() {
      const res = Mocks.resultSettingStartBlock.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.resultSettingStartBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.resultSettingStartBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultSettingEndBlock()', function() {
    it('returns the resultSettingEndBlock', function() {
      const res = Mocks.resultSettingEndBlock.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(CentralizedOracle.resultSettingEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(CentralizedOracle.resultSettingEndBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });
});

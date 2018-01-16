import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import DecentralizedOracle from '../src/decentralized_oracle';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';
import Mocks from './mocks';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('DecentralizedOracle', function() {

  describe('vote()', function() {
    it('returns a tx receipt', function() {
      const res = Mocks.vote.result;
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', function() {
      expect(DecentralizedOracle.vote({
        resultIndex: 1,
        botAmount: '5F5E100',
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if resultIndex is undefined', function() {
      expect(DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        botAmount: '5F5E100',
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if botAmount is undefined', function() {
      expect(DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        resultIndex: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        resultIndex: 1,
        botAmount: '5F5E100',
      })).to.be.rejectedWith(Error);
    });
  });

  describe('finalizeResult()', function() {
    it('returns a tx receipt', function() {
      const res = Mocks.finalizeResult.result;
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', function() {
      expect(DecentralizedOracle.finalizeResult({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(DecentralizedOracle.finalizeResult({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
      })).to.be.rejectedWith(Error);
    });
  });

  describe('arbitrationEndBlock()', function() {
    it('returns the arbitrationEndBlock', function() {
      const res = Mocks.arbitrationEndBlock.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(DecentralizedOracle.arbitrationEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(DecentralizedOracle.arbitrationEndBlock({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
      })).to.be.rejectedWith(Error);
    });
  });

  describe('lastResultIndex()', function() {
    it('returns the lastResultIndex', function() {
      const res = Mocks.lastResultIndex.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(DecentralizedOracle.lastResultIndex({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(DecentralizedOracle.lastResultIndex({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
      })).to.be.rejectedWith(Error);
    });
  });
});

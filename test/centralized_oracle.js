import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import CentralizedOracle from '../src/centralized_oracle.js';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('CentralizedOracle', function() {
  const address = 'd78f96ea55ad0c8a283b6d759f39cda34a7c5b10';

  describe('bet()', function() {
    it('returns a tx receipt', async function() {
      const res = await CentralizedOracle.bet({
        contractAddress: address,
        index: 1,
        amount: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.bet({
        index: 1,
        amount: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if index is undefined', async function() {
      expect(CentralizedOracle.bet({
        contractAddress: address,
        amount: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if amount is undefined', async function() {
      expect(CentralizedOracle.bet({
        contractAddress: address,
        index: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.bet({
        contractAddress: address,
        index: 1,
        amount: 1,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('setResult()', function() {
    it('returns a tx receipt', async function() {
      const res = await CentralizedOracle.setResult({
        contractAddress: address,
        resultIndex: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.setResult({
        resultIndex: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if resultIndex is undefined', async function() {
      expect(CentralizedOracle.setResult({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.setResult({
        contractAddress: address,
        resultIndex: 1,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('oracle()', function() {
    it('returns the oracle', async function() {
      const res = await CentralizedOracle.oracle({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.equal(res[0], '17e7888aa7412a735f336d2f6d784caefabb6fa3');
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.oracle({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.oracle({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('bettingStartBlock()', function() {
    it('returns the bettingStartBlock', async function() {
      const res = await CentralizedOracle.bettingStartBlock({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.bettingStartBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.bettingStartBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('bettingEndBlock()', function() {
    it('returns the bettingEndBlock', async function() {
      const res = await CentralizedOracle.bettingEndBlock({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.bettingEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.bettingEndBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultSettingStartBlock()', function() {
    it('returns the resultSettingStartBlock', async function() {
      const res = await CentralizedOracle.resultSettingStartBlock({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.resultSettingStartBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.resultSettingStartBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultSettingEndBlock()', function() {
    it('returns the resultSettingEndBlock', async function() {
      const res = await CentralizedOracle.resultSettingEndBlock({
        contractAddress: address,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.resultSettingEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.resultSettingEndBlock({
        contractAddress: address,
      })).to.be.rejectedWith(Error);
    });
  });
});

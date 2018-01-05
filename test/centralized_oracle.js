import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';
import BigNumber from 'bignumber.js';

import CentralizedOracle from '../src/centralized_oracle.js';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('CentralizedOracle', function() {

  describe('bet()', function() {
    it('returns a tx receipt', async function() {
      const res = await CentralizedOracle.bet({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
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
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        amount: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if amount is undefined', async function() {
      expect(CentralizedOracle.bet({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        index: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.bet({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        index: 1,
        amount: 1,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('setResult()', function() {
    it('returns a tx receipt', async function() {
      const res = await CentralizedOracle.setResult({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
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
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.setResult({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        resultIndex: 1,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('oracle()', function() {
    it('returns the oracle', async function() {
      const res = await CentralizedOracle.oracle({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
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
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
      })).to.be.rejectedWith(Error);
    });
  });

  describe('bettingEndBlock()', function() {
    it('returns the bettingEndBlock', async function() {
      const res = await CentralizedOracle.bettingEndBlock({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBigNumber(new BigNumber(res[0])));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.bettingEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.bettingEndBlock({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultSettingEndBlock()', function() {
    it('returns the resultSettingEndBlock', async function() {
      const res = await CentralizedOracle.resultSettingEndBlock({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBigNumber(new BigNumber(res[0])));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(CentralizedOracle.resultSettingEndBlock({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(CentralizedOracle.resultSettingEndBlock({
        contractAddress: '814e63497adb7eae5cc217c71d564ee437fb1973',
      })).to.be.rejectedWith(Error);
    });
  });
});

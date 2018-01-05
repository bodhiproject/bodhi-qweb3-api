import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';
import BigNumber from 'bignumber.js';

import DecentralizedOracle from '../src/decentralized_oracle';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('DecentralizedOracle', function() {
  describe('vote()', function() {
    it('returns a tx receipt', async function() {
      const res = await DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        resultIndex: 1,
        botAmount: '5F5E100',
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(DecentralizedOracle.vote({
        resultIndex: 1,
        botAmount: '5F5E100',
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if resultIndex is undefined', async function() {
      expect(DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        botAmount: '5F5E100',
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if botAmount is undefined', async function() {
      expect(DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        resultIndex: 1,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(DecentralizedOracle.vote({
        contractAddress: 'e5b0676c6445e6d82b39e8c2a6f7e338bd0a577e',
        resultIndex: 1,
        botAmount: '5F5E100',
      })).to.be.rejectedWith(Error);
    });
  });
});

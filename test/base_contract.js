import _ from 'lodash';
import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import BaseContract from '../src/base_contract';
import TestConfig from './config/test_config';
import Mocks from './mocks';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('BaseContract', function() {
  const contractAddress = 'e4ba4d301d4c22d2634a3d8e23c47b7e9e4ef4df';

  describe('version()', function() {
    it('returns the version', function() {
      const res = Mocks.version.result;
      assert.isDefined(res[0]);
      assert.equal(res[0], 0);
    });

    it('throws if contractAddress is undefined', function() {
      expect(BaseContract.version({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(BaseContract.version({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultIndex()', function() {
    it('returns the resultIndex', function() {
      const res = Mocks.resultIndex.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', function() {
      expect(BaseContract.resultIndex({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(BaseContract.resultIndex({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getBetBalances()', function() {
    it('returns the bet balances', function() {
      const res = Mocks.getBetBalances.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { 
        return Web3Utils.isHex(item);
      }));
    });

    it('throws if contractAddress is undefined', function() {
      expect(BaseContract.getBetBalances({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(BaseContract.getBetBalances({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getVoteBalances()', function() {
    it('returns the vote balances', function() {
      const res = Mocks.getVoteBalances.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => {
        return Web3Utils.isHex(item);
      }));
    });

    it('throws if contractAddress is undefined', function() {
      expect(BaseContract.getVoteBalances({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(BaseContract.getVoteBalances({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalBets()', function() {
    it('returns the total bets', function() {
      const res = Mocks.getTotalBets.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => {
        return Web3Utils.isHex(item);
      }));
    });

    it('throws if contractAddress is undefined', function() {
      expect(BaseContract.getTotalBets({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(BaseContract.getTotalBets({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalVotes()', function() {
    it('returns the total votes', async function() {
      const res = Mocks.getTotalVotes.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => {
        return Web3Utils.isHex(item);
      }));
    });

    it('throws if contractAddress is undefined', function() {
      expect(BaseContract.getTotalVotes({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', function() {
      expect(BaseContract.getTotalVotes({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });
});

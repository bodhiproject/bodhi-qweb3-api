import _ from 'lodash';
import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import BaseContract from '../src/base_contract';
import TestConfig from './config/test_config';
import Mocks from './mock/base_contract';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('BaseContract', () => {
  const contractAddress = 'e4ba4d301d4c22d2634a3d8e23c47b7e9e4ef4df';

  describe('version()', () => {
    it('returns the version', () => {
      const res = Mocks.version.result;
      assert.isDefined(res[0]);
      assert.equal(res[0], 0);
    });

    it('throws if contractAddress is undefined', () => {
      expect(BaseContract.version({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', () => {
      expect(BaseContract.version({
        contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultIndex()', () => {
    it('returns the resultIndex', () => {
      const res = Mocks.resultIndex.result;
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isHex(res[0]));
    });

    it('throws if contractAddress is undefined', () => {
      expect(BaseContract.resultIndex({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', () => {
      expect(BaseContract.resultIndex({
        contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getBetBalances()', () => {
    it('returns the bet balances', () => {
      const res = Mocks.getBetBalances.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], item => Web3Utils.isHex(item)));
    });

    it('throws if contractAddress is undefined', () => {
      expect(BaseContract.getBetBalances({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', () => {
      expect(BaseContract.getBetBalances({
        contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getVoteBalances()', () => {
    it('returns the vote balances', () => {
      const res = Mocks.getVoteBalances.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], item => Web3Utils.isHex(item)));
    });

    it('throws if contractAddress is undefined', () => {
      expect(BaseContract.getVoteBalances({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', () => {
      expect(BaseContract.getVoteBalances({
        contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalBets()', () => {
    it('returns the total bets', () => {
      const res = Mocks.getTotalBets.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], item => Web3Utils.isHex(item)));
    });

    it('throws if contractAddress is undefined', () => {
      expect(BaseContract.getTotalBets({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', () => {
      expect(BaseContract.getTotalBets({
        contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalVotes()', () => {
    it('returns the total votes', async () => {
      const res = Mocks.getTotalVotes.result;
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], item => Web3Utils.isHex(item)));
    });

    it('throws if contractAddress is undefined', () => {
      expect(BaseContract.getTotalVotes({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', () => {
      expect(BaseContract.getTotalVotes({
        contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });
});

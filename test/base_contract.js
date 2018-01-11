import _ from 'lodash';
import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import BaseContract from '../src/base_contract';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('BaseContract', function() {
  const contractAddress = 'e4ba4d301d4c22d2634a3d8e23c47b7e9e4ef4df';

  describe('version()', function() {
    it('returns the version', async function() {
      const res = await BaseContract.version({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(BaseContract.version({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BaseContract.version({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultIndex()', function() {
    it('returns the resultIndex', async function() {
      const res = await BaseContract.resultIndex({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(BaseContract.resultIndex({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BaseContract.resultIndex({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getBetBalances()', function() {
    it('returns the bet balances', async function() {
      const res = await BaseContract.getBetBalances({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(BaseContract.getBetBalances({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BaseContract.getBetBalances({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getVoteBalances()', function() {
    it('returns the vote balances', async function() {
      const res = await BaseContract.getVoteBalances({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(BaseContract.getVoteBalances({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BaseContract.getVoteBalances({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalBets()', function() {
    it('returns the total bets', async function() {
      const res = await BaseContract.getTotalBets({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(BaseContract.getTotalBets({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BaseContract.getTotalBets({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalVotes()', function() {
    it('returns the total votes', async function() {
      const res = await BaseContract.getTotalVotes({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(BaseContract.getTotalVotes({
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BaseContract.getTotalVotes({
        contractAddress: contractAddress,
      })).to.be.rejectedWith(Error);
    });
  });
});

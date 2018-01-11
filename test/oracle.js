import _ from 'lodash';
import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import Oracle from '../src/oracle';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

const CENTRALIZED = 'centralized';
const DECENTRALIZED = 'decentralized';

describe('Oracle', function() {
  const contractAddress = 'a5b27c03e76d4cf10928120439fa96181f07520c';
  const oracleType = CENTRALIZED;

  describe('getBetBalances()', function() {
    it('returns the bet balances', async function() {
      const res = await Oracle.getBetBalances({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.getBetBalances({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.getBetBalances({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.getBetBalances({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getVoteBalances()', function() {
    it('returns the vote balances', async function() {
      const res = await Oracle.getVoteBalances({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.getVoteBalances({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.getVoteBalances({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.getVoteBalances({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalBets()', function() {
    it('returns the total bets', async function() {
      const res = await Oracle.getTotalBets({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.getTotalBets({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.getTotalBets({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.getTotalBets({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('getTotalVotes()', function() {
    it('returns the total votes', async function() {
      const res = await Oracle.getTotalVotes({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.every(res[0], (item) => { return Web3Utils.isBN(item); }));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.getTotalVotes({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.getTotalVotes({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.getTotalVotes({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('version()', function() {
    it('returns the version', async function() {
      const res = await Oracle.version({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.version({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.version({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.version({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('eventAddress()', function() {
    it('returns the eventAddress', async function() {
      const res = await Oracle.eventAddress({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(_.isString(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.eventAddress({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.eventAddress({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.eventAddress({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('resultIndex()', function() {
    it('returns the resultIndex', async function() {
      const res = await Oracle.resultIndex({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.resultIndex({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.resultIndex({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.resultIndex({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('consensusThreshold()', function() {
    it('returns the consensusThreshold', async function() {
      const res = await Oracle.consensusThreshold({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isDefined(res[0]);
      assert.isTrue(Web3Utils.isBN(res[0]));
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.consensusThreshold({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.consensusThreshold({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.consensusThreshold({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });

  describe('finished()', function() {
    it('returns the finished flag', async function() {
      const res = await Oracle.finished({
        contractAddress: contractAddress,
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      });
      assert.isBoolean(res[0]);
    });

    it('throws if contractAddress is undefined', async function() {
      expect(Oracle.finished({
        oracleType: oracleType,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if oracleType is undefined', async function() {
      expect(Oracle.finished({
        contractAddress: contractAddress,
        senderAddress: TestConfig.SENDER_ADDRESS,
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(Oracle.finished({
        contractAddress: contractAddress,
        oracleType: oracleType,
      })).to.be.rejectedWith(Error);
    });
  });
});

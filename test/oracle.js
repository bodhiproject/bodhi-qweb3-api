import _ from 'lodash';
import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import Oracle from '../src/oracle';
import ContractUtils from './util/contract_utils';
import TestConfig from './config/test_config';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('Oracle', function() {

  describe('getBetBalances()', function() {
    const contractAddress = '0aa8e66621e66b3c2e42c33048f550232dde6d54';
    const oracleType = 'centralized';

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
    const contractAddress = '0aa8e66621e66b3c2e42c33048f550232dde6d54';
    const oracleType = 'decentralized';

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
    const contractAddress = '0aa8e66621e66b3c2e42c33048f550232dde6d54';
    const oracleType = 'centralized';

    it('returns the total bets', async function() {
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
});

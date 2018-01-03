import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Web3Utils from 'web3-utils';

import BodhiToken from '../src/bodhi_token.js';
import ContractMetadata from '../config/contract_metadata';
import ContractUtils from './util/contract_utils';

chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;

describe('BodhiToken', function() {
  describe('approve()', function() {
    it('returns a tx receipt', async function() {
      const res = await BodhiToken.approve({
        spender: 'qUDvDKsZQv84iS6mrA2i7ghjgM34mfUxQu',
        value: '0',
        senderAddress: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
      });
      assert.isTrue(ContractUtils.isTxReceipt(res));
    });

    it('throws if spender is undefined', async function() {
      expect(BodhiToken.approve({
        spender: undefined,
        value: '0',
        senderAddress: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
      })).to.be.rejectedWith(Error);
    });

    it('throws if value is undefined', async function() {
      expect(BodhiToken.approve({
        spender: 'qUDvDKsZQv84iS6mrA2i7ghjgM34mfUxQu',
        value: undefined,
        senderAddress: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
      })).to.be.rejectedWith(Error);
    });

    it('throws if senderAddress is undefined', async function() {
      expect(BodhiToken.approve({
        spender: 'qUDvDKsZQv84iS6mrA2i7ghjgM34mfUxQu',
        value: '0',
        senderAddress: undefined,
      })).to.be.rejectedWith(Error);
    });
  });

  describe.only('allowance()', function() {
    it('returns the allowance', async function() {
      const res = await BodhiToken.allowance({
        owner: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
        spender: 'qUDvDKsZQv84iS6mrA2i7ghjgM34mfUxQu',
        senderAddress: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
      });
      assert.isDefined(res.remaining);
      assert.isTrue(Web3Utils.isBigNumber(res.remaining));
    });
  });
});

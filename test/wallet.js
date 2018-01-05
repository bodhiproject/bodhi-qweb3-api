import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';

import Wallet from '../src/wallet';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('Wallet', function() {

  describe('getAccountAddress()', async function() {
    it('returns a qtum address', async function() {
      const res = await Wallet.getAccountAddress({
        accountName: ''
      });
      assert.isDefined(res);
      assert.isString(res);
    });

    it('throws if accountName is undefined', async function() {
      expect(Wallet.getAccountAddress()).to.be.rejectedWith(Error);
    });
  });

  describe('listUnspent()', async function() {
    it('returns the unspent tx outputs array', async function() {
      const res = await Wallet.listUnspent();
      assert.isDefined(res);
      assert.isArray(res);
    });
  });
});

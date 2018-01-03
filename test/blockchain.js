import 'babel-polyfill';
import { assert } from 'chai';

import Blockchain from '../src/blockchain.js';

describe('Blockchain', function() {

  describe('getBlockCount()', async function() {
    it('returns the blockcount', async function() {
      const res = await Blockchain.getBlockCount();
      assert.isDefined(res);
      assert.isNumber(res);
    });
  });
});

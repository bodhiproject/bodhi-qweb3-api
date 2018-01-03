import Blockchain from '../src/blockchain.js';

describe('Blockchain', function() {

  describe('getBlockCount()', function() {
    it('returns the blockcount', async function() {
      const res = await Blockchain.getBlockCount();
      assert.isDefined(res);
      assert.isNumber(res);
    });
  });
}

import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import BodhiToken from '../src/bodhi_token.js';
import ContractMetadata from '../config/contract_metadata';

chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;

describe('BodhiToken', function() {
  describe('approve()', function() {
    it('returns a tx receipt', async function() {
      const res = await BodhiToken.approve({
        spender: 'qUDvDKsZQv84iS6mrA2i7ghjgM34mfUxQu',
        value: 0,
        senderAddress: 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy',
      });
      assert.isDefined(res);
      console.log(res);
    });
  });
});

import 'babel-polyfill';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';

import Blockchain from '../src/blockchain.js';

Chai.use(ChaiAsPromised);
const assert = Chai.assert;
const expect = Chai.expect;

describe('Blockchain', function() {

  describe('getBlockCount()', function() {
    it('returns the blockcount', async function() {
      const res = await Blockchain.getBlockCount();
      assert.isDefined(res);
      assert.isNumber(res);
    });
  });

  describe('getTransactionReceipt()', function() {
    it('returns the transaction info', function() {
      const res = {
          "result": [
              {
                  "blockHash": "c8665533f1ee541a2203bcc17496aa79613ed44c2cf62ead62b4c57de3e6b93d",
                  "blockNumber": 68269,
                  "transactionHash": "127531304165ba5fbcdf41f4582f37bf74207cd2d83661a1eb01a425aa0e0047",
                  "transactionIndex": 2,
                  "from": "17e7888aa7412a735f336d2f6d784caefabb6fa3",
                  "to": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                  "cumulativeGasUsed": 56572,
                  "gasUsed": 56572,
                  "contractAddress": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                  "log": [
                      {
                          "address": "f6177bc9812eeb531907621af6641a41133dea9e",
                          "topics": [
                              "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                              "0000000000000000000000000387da9a3e773b559ca0367c5929360e4a4294f6",
                              "00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3"
                          ],
                          "data": "00000000000000000000000000000000000000000000000000000004a817c800"
                      },
                      {
                          "address": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                          "topics": [
                              "2b37430897e8d659983fc8ae7ab83ad5b3be5a7db7ea0add5706731c2395f550",
                              "0000000000000000000000000000000000000000000000000000000000000000",
                              "00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3"
                          ],
                          "data": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004a817c800"
                      }
                  ]
              }
          ]
      };

      assert.isDefined(res);
      assert.isDefined(res.result[0].blockHash);
      assert.isDefined(res.result[0].blockNumber);
      assert.isDefined(res.result[0].transactionHash);
      assert.isDefined(res.result[0].transactionIndex);
      assert.isDefined(res.result[0].from);
      assert.isDefined(res.result[0].to);
      assert.isDefined(res.result[0].cumulativeGasUsed);
      assert.isDefined(res.result[0].gasUsed);
      assert.isDefined(res.result[0].contractAddress);
      assert.isDefined(res.result[0].log);
    });

    it('throws if transactionId is undefined or empty', function() {
      expect(Blockchain.getTransactionReceipt()).to.be.rejectedWith(Error);
      expect(Blockchain.getTransactionReceipt({ transactionId: undefined })).to.be.rejectedWith(Error);
      expect(Blockchain.getTransactionReceipt({ transactionId: '' })).to.be.rejectedWith(Error);
    });
  });

  describe('searchLogs()', function() {
    it('returns an array of logs', function() {
      const res = {
          "result": [
              {
                  "blockHash": "c8665533f1ee541a2203bcc17496aa79613ed44c2cf62ead62b4c57de3e6b93d",
                  "blockNumber": 68269,
                  "transactionHash": "127531304165ba5fbcdf41f4582f37bf74207cd2d83661a1eb01a425aa0e0047",
                  "transactionIndex": 2,
                  "from": "17e7888aa7412a735f336d2f6d784caefabb6fa3",
                  "to": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                  "cumulativeGasUsed": 56572,
                  "gasUsed": 56572,
                  "contractAddress": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                  "log": [
                      {
                          "address": "f6177bc9812eeb531907621af6641a41133dea9e",
                          "topics": [
                              "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                              "0000000000000000000000000387da9a3e773b559ca0367c5929360e4a4294f6",
                              "00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3"
                          ],
                          "data": "00000000000000000000000000000000000000000000000000000004a817c800"
                      },
                      {
                          "address": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                          "topics": [
                              "2b37430897e8d659983fc8ae7ab83ad5b3be5a7db7ea0add5706731c2395f550",
                              "0000000000000000000000000000000000000000000000000000000000000000",
                              "00000000000000000000000017e7888aa7412a735f336d2f6d784caefabb6fa3"
                          ],
                          "data": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004a817c800"
                      }
                  ]
              }
          ]
      };
      assert.isDefined(res);
      assert.isArray(res);
    });

    it('throws if fromBlock is not a number', function() {
      expect(Blockchain.searchLogs({
        fromBlock: 'a', 
        toBlock: 50100, 
        addresses: [], 
        topics: ['c46e722c8158268af789d6a68206785f8d497869da236f87c2014c1c08fd3dec']
      })).to.be.rejectedWith(Error);
    });

    it('throws if toBlock is not a number', function() {
      expect(Blockchain.searchLogs({
        fromBlock: 50000, 
        toBlock: 'a', 
        addresses: [], 
        topics: ['c46e722c8158268af789d6a68206785f8d497869da236f87c2014c1c08fd3dec'],
      })).to.be.rejectedWith(Error);
    });
  });
});

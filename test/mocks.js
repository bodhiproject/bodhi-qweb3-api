module.exports = {
  // Blockchain
  getTransactionReceipt: {
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
  },
  searchLogs: {
      "result": [
          {
              "blockHash": "2aca546e5adb3a6e2ac38c5cba81f2ce40097a8982d8b6ef37795729048c48f3",
              "blockNumber": 68245,
              "transactionHash": "e5ffaafc8cf5a239750075ac1866537bc3999561e2bbd7012bc80b24e0338cbb",
              "transactionIndex": 2,
              "from": "17e7888aa7412a735f336d2f6d784caefabb6fa3",
              "to": "97c781c612ad23f4049f253bd52ac2889855f2da",
              "cumulativeGasUsed": 43448,
              "gasUsed": 43448,
              "contractAddress": "97c781c612ad23f4049f253bd52ac2889855f2da",
              "log": [
                  {
                      "0": "2",
                      "_finalResultIndex": "2",
                      "_version": "0",
                      "_eventAddress": "0387da9a3e773b559ca0367c5929360e4a4294f6",
                      "_eventName": "FinalResultSet"
                  }
              ]
          }
      ]
  },

  // BaseContract
  version: {
      "result": {
          "0": "0"
      }
  },
  resultIndex: {
      "result": {
          "0": "ff"
      }
  },
  getBetBalances: {
      "result": {
          "0": [
              "0",
              "0",
              "0",
              "0",
              "1dcd6500",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0"
          ]
      }
  },
  getVoteBalances: {
      "result": {
          "0": [
              "0",
              "0",
              "2540be400",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0"
          ]
      }
  },
  getTotalBets: {
      "result": {
          "0": [
              "0",
              "0",
              "0",
              "0",
              "1dcd6500",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0"
          ]
      }
  },
  getTotalVotes: {
      "result": {
          "0": [
              "0",
              "0",
              "2540be400",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0",
              "0"
          ]
      }
  },

  // BodhiToken
  approve: {
      "result": {
          "txid": "f6735da8217312a12e45e9801f5c4be1c4c39c325e0f335abfb63023044612cd",
          "sender": "qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy",
          "hash160": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },
  allowance: {
      "result": {
          "0": "20c855800",
          "remaining": "20c855800"
      }
  },
  balanceOf: {
      "result": {
          "0": "8ae136b5119",
          "balance": "8ae136b5119"
      }
  },

  // EventFactory
  createTopic: {
      "result": {
          "txid": "1c4d00e5eb3454578774eb0eb79f3bcc32cb15b4ded9624dc2985236a1668c70",
          "sender": "qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy",
          "hash160": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },

  // Oracle
  eventAddress: {
      "result": {
          "0": "45348630dd236f4107a12ed35637fe3b1eac6b64"
      }
  },
  consensusThreshold: {
      "result": {
          "0": "2540be400"
      }
  },
  finished: {
      "result": {
          "0": false
      }
  },

  // CentralizedOracle
  bet: {
      "result": {
          "txid": "9c740b223475e51775893b4af9d420ac6d6da0c9206e5b62c65e27bc93b6b0ae",
          "sender": "qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy",
          "hash160": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },
  setResult: {
      "result": {
          "txid": "5f393ab7f27e33de12ce36a41b38ec9d59ec16118844c08d81feaf027842cbd8",
          "sender": "qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy",
          "hash160": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },
  oracle: {
      "result": {
          "0": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },
  bettingStartBlock: {
      "result": {
          "0": "100e0"
      }
  },
  bettingEndBlock: {
      "result": {
          "0": "d822"
      }
  },
  resultSettingStartBlock: {
      "result": {
          "0": "109d8"
      }
  },
  resultSettingEndBlock: {
      "result": {
          "0": "10a68"
      }
  },

  // DecentralizedOracle
  vote: {
      "result": {
          "txid": "c495892b105ef7a96fa0651b8b8c6914641df96f87302de268e507166437ad17",
          "sender": "qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy",
          "hash160": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },
  finalizeResult: {
      "result": {
          "txid": "e9ab7d4d7b3263752148b10849f5d9c1428906723012e625dbcea96e6d8a74f4",
          "sender": "qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy",
          "hash160": "17e7888aa7412a735f336d2f6d784caefabb6fa3"
      }
  },
  arbitrationEndBlock: {
      "result": {
          "0": "10a81"
      }
  },
  lastResultIndex: {
      "result": {
          "0": "2"
      }
  },
};

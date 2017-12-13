import _ from 'lodash';
import moment from 'moment';
import promise from 'bluebird';

import utils from './src/modules/qweb3/src/utils';
import Contracts from './config/contracts';
import Topic from './src/models/topic';
import logger from './src/modules/logger';

var restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

var Qweb3 = require('./src/modules/qweb3/index');
const qweb3 = new Qweb3('http://bodhi:bodhi@localhost:13889');
const contractEventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);
const contractCentralizedOracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);

let topicsSnapshot = [];

/** Set up CORS to allow request from a different server */
const server = restify.createServer();
const cors = corsMiddleware({
  // preflightMaxAge: 5, //Optional 
  origins: ['*'],
  // allowHeaders: ['API-Token'],
  // exposeHeaders: ['API-Token-Expiry']
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true }));

/* GET Requests */
server.get('/listunspent', (req, res, next) => {
  listUnspent()
    .then((result) => {
      res.send(200, result);
    }, (err) => {
      res.send(500, result);
    });
});

/** List Topics from searchlog */
server.get('/topics', (req, res, next) => {
  if (_.isEmpty(topicsSnapshot)) {
    const fromBlock = 0;
    const toBlock = -1;
    const addresses = Contracts.EventFactory.address;
    const topics = ['null'];

    return contractEventFactory.searchLogs(fromBlock, toBlock, addresses, topics)
      .then((result) => {
          console.log(`Retrieved ${result.length} entries from searchLogs.`);

          let topicArray = [];
          _.each(result, (event, index) => {
            console.log(event);

            // Parse out logs
            if (!_.isEmpty(event.log)) {
              _.each(event.log, (logItem) => {
                topicArray.push(new Topic(logItem));
              });
            }
          });

          res.send(200, _.map(topicArray, (topic) => topic.toJson()));
          next();
        },
        (err) => {
          console.log(err.message);
          res.send(500, err.message);
          next();
        }
      );
  } else {
    res.send(200, topicsSnapshot);
    next();
  }
});

/* POST Requests */
server.post('/isconnected', (req, res, next) => {
  qweb3.isConnected()
    .then((result) => {
      res.send(200, {
        isConnected: result
      });
      next();
    })
});

server.post('/bet', (req, res, next) => {
  bet(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (error) => {
      console.log(error);
      res.send(500, { error });
    });
});

server.post('/createTopic', (req, res, next) => {
  createTopic(...Object.values(req.params))
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (error) => {
      console.log(error);
      res.send(500, { error });
    });
});

/** Start API server */
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

const senderAddress = 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy';

async function createTopic(_oracleAddress, _eventName, _resultNames, _bettingEndBlock, _resultSettingEndBlock, 
  _senderAddress) {
  console.log('Creating TopicEvent:');
  return await contractEventFactory.send('createTopic', {
    methodArgs: [_oracleAddress, _eventName, _resultNames, _bettingEndBlock, _resultSettingEndBlock],
    gasLimit: 5000000,
    senderAddress: _senderAddress,
  });
}
// createTopic('qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy', ['2019 NBA Finals winner?','','','','','','','','',''], 
//   ['Lakers','Warriors','Spurs','','','','','','',''], 50000, 50100, 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy');

async function bet(args) {
  const { index, amount, senderAddress } = args;

  console.log('bet(): index', index, 'amount', amount, 'senderAddress', senderAddress);

  if (index === undefined || amount === undefined) {
    res.send(500, 'Both index and amount needs to be defined.');
    return;
  }

  const result = await contractCentralizedOracle.send('bet', {
    methodArgs: [index],
    amount: amount,
    senderAddress: senderAddress,
  });

  console.log(result);
  return result;
}

// Run schedule monitoring job on startup
// TODO: We might want to add a switch to turn in on and off
// scheduleMonitorJob({
//   name: `job-searchlogs`,
//   cb: () => {
//     const fromBlock = 0;
//     const toBlock = -1;
//     const addresses = Contracts.EventFactory.address;
//     const topics = ['null'];

//     return contractEventFactory.searchLogs(fromBlock, toBlock, addresses, topics)
//       .then((result) => {
//         console.log(`Retrieved ${result.length} entries from searchLogs.`);

//         let topicArray = [];
//         _.each(result, (event, index) => {
//           console.log(event);

//           // Parse out logs
//           if (!_.isEmpty(event.log)) {
//             _.each(event.log, (logItem) => {
//               topicArray.push(new Topic(logItem));
//             });
//           }
//         });

//         topicsSnapshot = _.map(topicArray, (topic) => topic.toJson());

//         return promise.resolve();
//       });
//   },
//   options: { interval: 10000, attempts: 3, silent: false },
// });

/**
 * [scheduleMonitorJob description]
 * @param  {[type]} params [description]
 * @return {Parse.Promise}  A promise resolved upon job completion
 */
function scheduleMonitorJob(params) {
  const { name, cb, options } = params;

  const jobName = `${name}`;
  const interval = (options && options.interval) || 0; // Default 0, meaning run immediately
  const jobOptions = {
    // Retry 3 times on failure 
    attempts: (options && options.attempts) || 3,
    silent: (options && options.silent) || false,
  };

  let job = JobQueue.scheduleJob({
      jobName,
      interval,
      cb,
    },
    jobOptions,
  );

  job.on('complete', function(result) {
    console.log('Job completed with data ', result);

  }).on('failed attempt', function(errorMessage, doneAttempts) {
    console.log('Job failed', errorMessage, doneAttempts);

  }).on('failed', function(errorMessage) {
    console.log('Job failed', errorMessage);

  }).on('progress', function(progress, data) {
    console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
  })
}

async function listUnspent() {
  console.log('Listing unspent outputs:');
  let result = await qweb3.listUnspent();
  console.log(result);
}

async function getBlockCount() {
  console.log('getBlockCount');
  console.log(await qweb3.getBlockCount());
}

async function bet() {
  console.log('Placing bet:')
  let senderAddress = 'qKjn4fStBaAtwGiwueJf9qFxgpbAvf1xAy';
  let resultIndex = 2;

  let result = await contractCentralizedOracle.send('bet', {
      data: [resultIndex],
      amount: 10,
      senderAddress: senderAddress,
    });
  console.log(result);
}

async function getBetBalances() {
  const result = await contractCentralizedOracle.call('getBetBalances', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

async function getVoteBalances() {
  const result = await contractCentralizedOracle.call('getVoteBalances', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

async function getTotalBets() {
  const result = await contractCentralizedOracle.call('getTotalBets', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

async function getTotalVotes() {
  const result = await contractCentralizedOracle.call('getTotalVotes', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

async function getResult() {
  const result = await contractCentralizedOracle.call('getResult', {
    methodArgs: [],
    senderAddress: senderAddress,
  });
  console.log(result);
}

async function finished(centralizedOracleAddress, senderAddress) {
  try {
    const result = await contractCentralizedOracle.call('finished', {
      methodArgs: [],
      senderAddress: senderAddress,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

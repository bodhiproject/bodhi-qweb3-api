import _ from 'lodash';
import moment from 'moment';
import promise from 'bluebird';

import Config from './config/config';
import utils from './src/modules/qweb3/src/utils';
import Contracts from './config/contracts';
import Topic from './src/models/topic';
import logger from './src/modules/logger';
import { getBlockCount, getTransactionReceipt } from './src/contracts/blockchain.js';
import { listUnspent } from './src/contracts/wallet.js';
import { approve, allowance } from './src/contracts/bodhi_token.js';
import { createTopic } from './src/contracts/event_factory.js';
import { withdrawWinnings, didWithdraw } from './src/contracts/topic_event.js';
import { bet, setResult, getBetBalances, getVoteBalances, getTotalBets, getTotalVotes, getResult, finished }
from './src/contracts/centralized_oracle.js';
import { vote, finalizeResult, arbitrationEndBlock, lastResultIndex } from './src/contracts/decentralized_oracle.js';

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

const Qweb3 = require('./src/modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);
const contractEventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);

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

/* Misc */
server.post('/isconnected', (req, res, next) => {
  qweb3.isConnected()
    .then((result) => {
      res.send(200, {
        isConnected: result
      });
      next();
    })
});

/* Wallet */
server.get('/listunspent', (req, res, next) => {
  listUnspent()
    .then((result) => {
      console.log(result);
      res.send({result});
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* Blockchain */
server.post('/getblockcount', (req, res, next) => {
  getBlockCount()
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/gettransactionreceipt', (req, res, next) => {
  getTransactionReceipt(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* BodhiToken */
server.post('/approve', (req, res, next) => {
  approve(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/allowance', (req, res, next) => {
  allowance(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* EventFactory */
server.post('/createtopic', (req, res, next) => {
  createTopic(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* TopicEvent */
server.post('/withdraw', (req, res, next) => {
  withdrawWinnings(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/didwithdraw', (req, res, next) => {
  didWithdraw(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* CentralizedOracle */
server.post('/bet', (req, res, next) => {
  bet(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/setresult', (req, res, next) => {
  setResult(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/betbalances', (req, res, next) => {
  getBetBalances(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/votebalances', (req, res, next) => {
  getVoteBalances(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/totalbets', (req, res, next) => {
  getTotalBets(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/totalvotes', (req, res, next) => {
  getTotalVotes(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/getresult', (req, res, next) => {
  getResult(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/finished', (req, res, next) => {
  finished(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* DecentralizedOracle */
server.post('/vote', (req, res, next) => {
  vote(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/finalizeresult', (req, res, next) => {
  finalizeResult(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/arbitrationendblock', (req, res, next) => {
  arbitrationEndBlock(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/lastresultindex', (req, res, next) => {
  lastResultIndex(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/** Start API server */
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

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
import _ from 'lodash';
import moment from 'moment';
import promise from 'bluebird';

import Config from './config/config';
const Blockchain = require('./src/contracts/blockchain.js');
const Wallet = require('./src/contracts/wallet.js');
import { approve, allowance, balanceOf } from './src/contracts/bodhi_token.js';
import { createTopic } from './src/contracts/event_factory.js';
const TopicEvent = require('./src/contracts/topic_event.js');
import { invalidateOracle, getBetBalances, getVoteBalances, getTotalBets, getTotalVotes, getResult, finished } 
  from './src/contracts/oracle.js';
import { bet, setResult } from './src/contracts/centralized_oracle.js';
import { vote, finalizeResult, arbitrationEndBlock, lastResultIndex } from './src/contracts/decentralized_oracle.js';

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

const Qweb3 = require('./src/modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

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
  Wallet.listUnspent()
    .then((result) => {
      console.log(result);
      res.send({result});
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* Blockchain */
server.get('/getblockcount', (req, res, next) => {
  Blockchain.getBlockCount()
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/gettransactionreceipt', (req, res, next) => {
  Blockchain.getTransactionReceipt(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/searchlogs', (req, res, next) => {
  Blockchain.searchLogs(req.params)
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

server.post('/balanceof', (req, res, next) => {
  balanceOf(req.params)
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
  TopicEvent.withdrawWinnings(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/didwithdraw', (req, res, next) => {
  TopicEvent.didWithdraw(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/qtumwinnings', (req, res, next) => {
  TopicEvent.calculateQtumWinnings(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/botwinnings', (req, res, next) => {
  TopicEvent.calculateBotWinnings(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

/* Oracle */
server.post('/invalidateoracle', (req, res, next) => {
  invalidateOracle(req.params)
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

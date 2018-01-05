import _ from 'lodash';
import moment from 'moment';
import promise from 'bluebird';
import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import Qweb3 from 'qweb3';

import Config from './config/config';
import Blockchain from './src/contracts/blockchain.js';
import Wallet from './src/contracts/wallet.js';
import BodhiToken from './src/contracts/bodhi_token.js';
import EventFactory from './src/contracts/event_factory.js';
import TopicEvent from './src/contracts/topic_event.js';
import Oracle from './src/contracts/oracle.js';
import CentralizedOracle from './src/contracts/centralized_oracle.js';
import DecentralizedOracle from './src/contracts/decentralized_oracle.js';

const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

/** Set up CORS to allow request from a different server */
const server = restify.createServer();
const cors = corsMiddleware({
  origins: ['*'],
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
server.post('/get-account-address', (req, res, next) => {
  Wallet.getAccountAddress(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.get('/listunspent', (req, res, next) => {
  Wallet.listUnspent()
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* Blockchain */
server.get('/getblockcount', (req, res, next) => {
  Blockchain.getBlockCount()
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/gettransactionreceipt', (req, res, next) => {
  Blockchain.getTransactionReceipt(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/searchlogs', (req, res, next) => {
  Blockchain.searchLogs(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* BodhiToken */
server.post('/approve', (req, res, next) => {
  BodhiToken.approve(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/allowance', (req, res, next) => {
  BodhiToken.allowance(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/botbalance', (req, res, next) => {
  BodhiToken.balanceOf(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* EventFactory */
server.post('/createtopic', (req, res, next) => {
  EventFactory.createTopic(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* TopicEvent */
server.post('/withdraw', (req, res, next) => {
  TopicEvent.withdrawWinnings(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/status', (req, res, next) => {
  TopicEvent.status(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/didwithdraw', (req, res, next) => {
  TopicEvent.didWithdraw(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/qtumwinnings', (req, res, next) => {
  TopicEvent.calculateQtumWinnings(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/botwinnings', (req, res, next) => {
  TopicEvent.calculateBotWinnings(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* Oracle */
server.post('/invalidateoracle', (req, res, next) => {
  Oracle.invalidateOracle(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/betbalances', (req, res, next) => {
  Oracle.getBetBalances(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/votebalances', (req, res, next) => {
  Oracle.getVoteBalances(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/totalbets', (req, res, next) => {
  Oracle.getTotalBets(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/totalvotes', (req, res, next) => {
  Oracle.getTotalVotes(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/getresult', (req, res, next) => {
  Oracle.getResult(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/finished', (req, res, next) => {
  Oracle.finished(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* CentralizedOracle */
server.post('/bet', (req, res, next) => {
  CentralizedOracle.bet(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/setresult', (req, res, next) => {
  CentralizedOracle.setResult(req.params)
    .then((result) => {
      console.log(result);
      res.send(200, { result });
    }, (err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

server.post('/oracle', (req, res, next) => {
  CentralizedOracle.oracle(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/betendblock', (req, res, next) => {
  CentralizedOracle.bettingEndBlock(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/resultsetendblock', (req, res, next) => {
  CentralizedOracle.resultSettingEndBlock(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/* DecentralizedOracle */
server.post('/vote', (req, res, next) => {
  DecentralizedOracle.vote(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/finalizeresult', (req, res, next) => {
  DecentralizedOracle.finalizeResult(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/arbitrationendblock', (req, res, next) => {
  DecentralizedOracle.arbitrationEndBlock(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

server.post('/lastresultindex', (req, res, next) => {
  DecentralizedOracle.lastResultIndex(req.params)
    .then((result) => {
      res.send(200, { result });
    }, (err) => {
      res.send({ error: err.message });
    });
});

/** Start API server */
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

import _ from 'lodash';
import moment from 'moment';
import promise from 'bluebird';
import restify from 'restify';
import bunyan from 'bunyan';
import corsMiddleware from 'restify-cors-middleware';
import Qweb3 from 'qweb3';

import Config from '../config/config';
import Blockchain from './blockchain.js';
import Wallet from './wallet.js';
import BodhiToken from './bodhi_token.js';
import EventFactory from './event_factory.js';
import TopicEvent from './topic_event.js';
import Oracle from './oracle.js';
import CentralizedOracle from './centralized_oracle.js';
import DecentralizedOracle from './decentralized_oracle.js';

const server = restify.createServer({
  name: 'bodhi-api'
});

// Set up CORS to allow request from a different server
const cors = corsMiddleware({
  origins: ['*'],
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.on('after', restify.plugins.auditLogger({
  log: bunyan.createLogger({
    name: 'bodhi-api',
    stream: process.stdout
  }),
  event: 'after',
  server: server,
  printLog: true
}));

const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

/* Misc */
server.post('/isconnected', (req, res, next) => {
  qweb3.isConnected()
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* Wallet */
server.post('/get-account-address', (req, res, next) => {
  Wallet.getAccountAddress(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.get('/listunspent', (req, res, next) => {
  Wallet.listUnspent()
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* Blockchain */
server.get('/getblockcount', (req, res, next) => {
  Blockchain.getBlockCount()
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/gettransactionreceipt', (req, res, next) => {
  Blockchain.getTransactionReceipt(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/searchlogs', (req, res, next) => {
  Blockchain.searchLogs(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* BodhiToken */
server.post('/approve', (req, res, next) => {
  BodhiToken.approve(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/allowance', (req, res, next) => {
  BodhiToken.allowance(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/botbalance', (req, res, next) => {
  BodhiToken.balanceOf(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* EventFactory */
server.post('/createtopic', (req, res, next) => {
  EventFactory.createTopic(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* TopicEvent */
server.post('/withdraw', (req, res, next) => {
  TopicEvent.withdrawWinnings(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/status', (req, res, next) => {
  TopicEvent.status(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/didwithdraw', (req, res, next) => {
  TopicEvent.didWithdraw(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/qtumwinnings', (req, res, next) => {
  TopicEvent.calculateQtumWinnings(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/botwinnings', (req, res, next) => {
  TopicEvent.calculateBotWinnings(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* Oracle */
server.post('/invalidateoracle', (req, res, next) => {
  Oracle.invalidateOracle(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/betbalances', (req, res, next) => {
  Oracle.getBetBalances(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/votebalances', (req, res, next) => {
  Oracle.getVoteBalances(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/totalbets', (req, res, next) => {
  Oracle.getTotalBets(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/totalvotes', (req, res, next) => {
  Oracle.getTotalVotes(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/getresult', (req, res, next) => {
  Oracle.getResult(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/finished', (req, res, next) => {
  Oracle.finished(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* CentralizedOracle */
server.post('/bet', (req, res, next) => {
  CentralizedOracle.bet(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/setresult', (req, res, next) => {
  CentralizedOracle.setResult(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/oracle', (req, res, next) => {
  CentralizedOracle.oracle(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/bet-start-block', (req, res, next) => {
  CentralizedOracle.bettingStartBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/betendblock', (req, res, next) => {
  CentralizedOracle.bettingEndBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/result-set-start-block', (req, res, next) => {
  CentralizedOracle.resultSettingStartBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/resultsetendblock', (req, res, next) => {
  CentralizedOracle.resultSettingEndBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/* DecentralizedOracle */
server.post('/vote', (req, res, next) => {
  DecentralizedOracle.vote(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/finalizeresult', (req, res, next) => {
  DecentralizedOracle.finalizeResult(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/arbitrationendblock', (req, res, next) => {
  DecentralizedOracle.arbitrationEndBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

server.post('/lastresultindex', (req, res, next) => {
  DecentralizedOracle.lastResultIndex(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, result, next);
    });
});

/** Start API server */
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function onRequestSuccess(res, result, next) {
  res.send(200, { result });
  next();
}

function onRequestError(res, err, next) {
  res.send({ error: err.message });
  next();
}

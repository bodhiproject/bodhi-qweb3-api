import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import Qweb3 from 'qweb3';

import Config from '../config/config';
import Blockchain from './blockchain';
import Wallet from './wallet';
import BodhiToken from './bodhi_token';
import BaseContract from './base_contract';
import EventFactory from './event_factory';
import TopicEvent from './topic_event';
import Oracle from './oracle';
import CentralizedOracle from './centralized_oracle';
import DecentralizedOracle from './decentralized_oracle';

function onRequestSuccess(res, result, next) {
  res.send(200, { result });
  next();
}

function onRequestError(res, err, next) {
  res.send(500, { error: err.message });
  next();
}

const server = restify.createServer({
  name: 'bodhi-api',
});

// Set up CORS to allow request from a different server
const cors = corsMiddleware({
  origins: ['*'],
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.on('after', (req, res, route, err) => {
  if (route) {
    console.log(`${route.methods[0]} ${route.spec.path} ${res.statusCode}`);
  } else {
    console.log(`${err.message}`);
  }
});

const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

/* Misc */
server.post('/is-connected', (req, res, next) => {
  qweb3.isConnected()
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* Wallet */
server.post('/get-account-address', (req, res, next) => {
  Wallet.getAccountAddress(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.get('/list-unspent', (req, res, next) => {
  Wallet.listUnspent()
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* Blockchain */
server.get('/get-block-count', (req, res, next) => {
  Blockchain.getBlockCount()
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/get-transaction-receipt', (req, res, next) => {
  Blockchain.getTransactionReceipt(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/search-logs', (req, res, next) => {
  Blockchain.searchLogs(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* BodhiToken */
server.post('/approve', (req, res, next) => {
  BodhiToken.approve(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/allowance', (req, res, next) => {
  BodhiToken.allowance(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/bot-balance', (req, res, next) => {
  BodhiToken.balanceOf(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* BaseContract */
server.post('/version', (req, res, next) => {
  BaseContract.version(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/get-result', (req, res, next) => {
  BaseContract.resultIndex(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/bet-balances', (req, res, next) => {
  BaseContract.getBetBalances(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/vote-balances', (req, res, next) => {
  BaseContract.getVoteBalances(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/total-bets', (req, res, next) => {
  BaseContract.getTotalBets(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/total-votes', (req, res, next) => {
  BaseContract.getTotalVotes(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* EventFactory */
server.post('/create-topic', (req, res, next) => {
  EventFactory.createTopic(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* TopicEvent */
server.post('/withdraw', (req, res, next) => {
  TopicEvent.withdrawWinnings(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/total-qtum-value', (req, res, next) => {
  TopicEvent.totalQtumValue(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/total-bot-value', (req, res, next) => {
  TopicEvent.totalBotValue(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/final-result', (req, res, next) => {
  TopicEvent.getFinalResult(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/status', (req, res, next) => {
  TopicEvent.status(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/did-withdraw', (req, res, next) => {
  TopicEvent.didWithdraw(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/winnings', (req, res, next) => {
  TopicEvent.calculateWinnings(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* Oracle */
server.post('/event-address', (req, res, next) => {
  Oracle.eventAddress(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/consensus-threshold', (req, res, next) => {
  Oracle.consensusThreshold(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/finished', (req, res, next) => {
  Oracle.finished(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* CentralizedOracle */
server.post('/bet', (req, res, next) => {
  CentralizedOracle.bet(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/set-result', (req, res, next) => {
  CentralizedOracle.setResult(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/oracle', (req, res, next) => {
  CentralizedOracle.oracle(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/bet-start-block', (req, res, next) => {
  CentralizedOracle.bettingStartBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/bet-end-block', (req, res, next) => {
  CentralizedOracle.bettingEndBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/result-set-start-block', (req, res, next) => {
  CentralizedOracle.resultSettingStartBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/result-set-end-block', (req, res, next) => {
  CentralizedOracle.resultSettingEndBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/* DecentralizedOracle */
server.post('/vote', (req, res, next) => {
  DecentralizedOracle.vote(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/finalize-result', (req, res, next) => {
  DecentralizedOracle.finalizeResult(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/arbitration-end-block', (req, res, next) => {
  DecentralizedOracle.arbitrationEndBlock(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

server.post('/last-result-index', (req, res, next) => {
  DecentralizedOracle.lastResultIndex(req.params)
    .then((result) => {
      onRequestSuccess(res, result, next);
    }, (err) => {
      onRequestError(res, err, next);
    });
});

/** Start API server */
server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});

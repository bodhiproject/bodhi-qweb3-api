import _ from 'lodash';
import utils from './src/modules/qweb3/src/utils';

import Contracts from './config/contracts';
import Topic from './src/models/topic';

var restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

var Qweb3 = require('./src/modules/qweb3').default;
const qweb3 = new Qweb3('http://bodhi:bodhi@localhost:13889');
const contractEventFactory = new qweb3.Contract(Contracts.EventFactory.address, Contracts.EventFactory.abi);

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

const cors = corsMiddleware({
  // preflightMaxAge: 5, //Optional 
  origins: ['*'],
  // allowHeaders: ['API-Token'],
  // exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight);
server.use(cors.actual);

server.post('/isconnected', (req, res, next) => {

  qweb3.isConnected()
    .then((result) => {
      res.send(200, {
        isConnected: result
      });
      next();
    })
});

server.post('/createTopic', (req, res, next) => {

  let senderAddress = '0x57676fb32b6c7aca8ceafd04495c69a9956d948d1e0c8e7d6dc89d3cb2912909';
  let resultSetter = '0x57676fb32b6c7aca8ceafd04495c69a9956d948d1e0c8e7d6dc89d3cb2912909';
  let oracle = '0x17e7888aa7412a735f336d2f6d784caefabb6fa3';
  const addresses = Contracts.EventFactory.address;
  const topics = ['null'];


  let nameStr = utils.toHex('What am I gonna eat tonight???');

  if (nameStr.indexOf('0x') === 0) {
    nameStr = nameStr.slice(2);
  }

  let name = [];
  let maxArrayLength = 10;
  let arrayCapacity = 32 * 2; // 32 bytes times 2 hex character

  let currentIdx = 0;
  let lastIdx = nameStr.length - 1;

  while (currentIdx < lastIdx) {
    console.log("currentIdx is " + currentIdx);
    let subStr;
    let endIdx;

    if (currentIdx + arrayCapacity <= lastIdx) {
      endIdx = currentIdx + arrayCapacity;
      subStr = nameStr.slice(currentIdx, endIdx);
    } else {
      endIdx = lastIdx;
      subStr = nameStr.slice(currentIdx);
    }

    // _.padEnd(subStr, arrayCapacity, '0');

    currentIdx = endIdx;

    // Push hex string to name array.
    // Break the loop if max array length is reached
    if (name.length < maxArrayLength) {
      name.push('0x' + subStr);
    } else {
      console.log("Name array reach max length " + maxArrayLength);
      break;
    }
  }

  // construct rest arrays to make the length maxArrayLength
  for (let index = 0; index < maxArrayLength; index += 1) {
    if (name[index] === undefined) {
      name[index] = utils.toHex('\u0000');
    }
  }

  let resultNames = new Array(10).fill('\u0000');
  resultNames[0] = 'American';
  resultNames[1] = 'Italian';
  resultNames[2] = 'French';
  resultNames[3] = 'Vietnamese';
  resultNames[4] = 'Burmese';
  resultNames[5] = 'Mexican';
  resultNames[6] = 'Mediterrenian';
  resultNames[7] = 'Idian';
  resultNames[8] = 'Sichuan';
  resultNames = _.map(resultNames, (value) => utils.toHex(value));

  const bettingEndBlock = 54000;
  const resultSettingEndBlock = 55000;

  return contractEventFactory.send('createTopic', {
      senderAddress: senderAddress,
      data: [oracle, name, resultNames, bettingEndBlock, resultSettingEndBlock],
    })
    .then((result) => {

        console.log(result);
        res.send(200, result);
        next();
      },
      (err) => {
        console.log(err.message);
        res.send(500, err.message);
        next();
      });
});

server.get('/topics', (req, res, next) => {

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
    });
});


server.head('/hello/:name', respond);

server.post('/hello', function create(req, res, next) {
  res.send(201, Math.random().toString(36).substr(3, 8));
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
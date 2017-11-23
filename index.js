var restify = require('restify');
var Qweb3 = require('./src/modules/qweb3').default;
const qweb3 = new Qweb3('http://kezjo:qweASD@localhost:13889');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', (req, res, next) => {

  qweb3.isConnected()
    .then(() => {
      res.send('hello ' + req.params.name);
      next();
    })
});
server.head('/hello/:name', respond);

server.post('/hello', function create(req, res, next) {
  res.send(201, Math.random().toString(36).substr(3, 8));
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
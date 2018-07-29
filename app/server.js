require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');
const compression = require('compression');
const {ApolloServer} = require('apollo-server-express');
const {apolloUploadExpress} = require('apollo-upload-server');

const authMiddleware = require('./middlewares/auth');
const {handleAsyncExceptions, isTesting} = require('./util');
const schema = require('./graphql/schema')(isTesting);

function run() {
  const app = express();
  app.set('root', `${__dirname}/..`);
  // enable public folder
  app.use('/', express.static(`${__dirname}'/../static`));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
  // parse application/json
  app.use(bodyParser.json({limit: '50mb'}));
  // enable cors
  app.use(cors());
  // enable gzip
  app.use(compression());
  // handle errors and send them back to browser
  app.use(errorhandler());
  // set the base uri
  const baseUrl = `${process.env.APP_URL}:${process.env.APP_PORT}`;
  app.set('baseUrl', baseUrl);
  // set middlewares
  app.use(authMiddleware);
  app.use(apolloUploadExpress());
  // mount web
  app.get('/', (req, res) => {
    res.status(200).send('<img src="/icons/logo/black/logo@3x.png"><br>Building Web…');
  });
  // mount docs
  app.get('/docs', (req, res) => {
    res.status(200).send('<img src="/icons/logo/black/logo@3x.png"><br>Building Docs…');
  });
  // mount api
  const apolloServer = new ApolloServer(schema);
  apolloServer.applyMiddleware({app, path: '/api'});
  // mount server
  app.listen(+process.env.APP_PORT, () => {
    console.log('\n\x1b[34m∞ Web at\x1b[0m', `${baseUrl}/`);
    console.log('\x1b[36m∞ Docs at\x1b[0m', `${baseUrl}/docs`);
    console.log('\x1b[31m∞ API at\x1b[0m', `${baseUrl}${apolloServer.graphqlPath}`);
    console.log('\n\x1b[32mImageView running 🚀\x1b[0m');
  });
  return app;
}

if (require.main === module) {
  handleAsyncExceptions();
  run();
}

module.exports = run;

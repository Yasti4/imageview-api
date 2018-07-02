require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');
const compression = require('compression');
const {handleAsyncExceptions} = require('app/util');
const graphqlServer = require('./graphql/server');

function run() {
  const app = express();
  app.set('root', `${__dirname}/..`);
  // enable public folder
  app.use('/static', express.static(`${__dirname}'/../static`));
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
  // mount the routes
  app.use(graphqlServer);
  // mount server
  app.listen(+process.env.APP_PORT, process.env.APP_URL, () => {
    console.log('\n\x1b[34m∞ Web Running at\x1b[0m', baseUrl);
    console.log('\x1b[36m∞ Intranet Running at\x1b[0m', `${baseUrl}/intranet`);
    console.log('\n\x1b[31m∞ API Running at\x1b[0m', `${baseUrl}/api`);
    console.log('\x1b[35m∞ GraphiQL Running at\x1b[0m', `${baseUrl}/graphiql`);
    console.log('\n\x1b[32mBy yasti4 & ticdenis 💃\x1b[0m');
  });
}

module.exports = run;

if (require.main === module) {
  handleAsyncExceptions();
  run();
}

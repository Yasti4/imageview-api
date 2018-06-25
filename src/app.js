'use strict';

const Ouch = require('ouch');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const jwt = require('jwt-simple');
const { unixTimestamp } = require('./helpers');

require('dotenv').load();
const isDevelopment = process.env.NODE_ENV !== 'production';

// Sequelize

const db = require('./models');

// Express

const app = express();
app.use('/static', express.static(`${__dirname}'/../static`));
app.set('port', +process.env.APP_PORT);
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use((err, req, res, next) => {
  new Ouch([new Ouch.handlers.PrettyPageHandler()]).handleException(err, req, res);
});

// JWT

const isAuthMiddleware = (req, res, next) => {
  req.isAuth = false;
  req.userAuth = null;
  // req.isAuth = true;
  // req.userAuth = { id: 1, role: 'admin' };
  try {
    const authorization = req.headers.Authorization || req.headers.authorization || req.query.token || '';
    const token = authorization.split(' ')[1] /* HEADERS */ || authorization; /* GET */
    const payload = jwt.decode(token, process.env.APP_KEY);
    if (payload.exp > unixTimestamp()) {
      req.isAuth = true;
      req.userAuth = payload.sub;
    }
  } catch (err) {}
  next();
};

// GraphQL

app.use('/api', isAuthMiddleware, apolloUploadExpress(), graphqlExpress(async req => {
  return {
    schema: require('./schema'),
    context: {
      db,
      isAdmin: req.isAuth ? req.userAuth.role === 'admin' : false,
      isAuth: req.isAuth,
      userAuth: req.userAuth
    },
    cacheControl: {
      defaultMaxAge: process.env.APP_CACHE_SECONDS || 1800
    }
  };
}));
if (isDevelopment) {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api'
  }));

  app.get('/dev/test-image', (req, res, next) => {
    // const filePath = `${process.env.IMAGES_FOLDER}/lg/sj_gkfdzm.jpg`;
    // const imageSize = require('image-size');
    // const { width, height } = await imageSize(filePath);
    // res.send(
    //   JSON.stringify({ width, height })
    // );
    // const sharp = require('sharp');
    // const data = await sharp(filePath).metadata();
    // const getColors = require('get-image-colors');
    // getColors(filePath).then(colors => {
    //   res.send(
    //     JSON.stringify(colors)
    //   );
    // });
  });
}

// Listen the server

app.listen(+process.env.APP_PORT, () => {
  const baseUrl = `${process.env.APP_URL}:${process.env.APP_PORT}`;
  console.log('\n\x1b[34m∞ Web Running at\x1b[0m', baseUrl);
  console.log('\x1b[36m∞ Intranet Running at\x1b[0m', `${baseUrl}/intranet`);
  console.log('\n\x1b[31m∞ API Running at\x1b[0m', `${baseUrl}/api`);
  console.log('\x1b[35m∞ GraphiQL Running at\x1b[0m', `${baseUrl}/graphiql`);
  console.log('\n\x1b[32mBy yasti4 & ticdenis 💃\x1b[0m');
});

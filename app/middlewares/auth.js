const {unixTimestamp} = require('./../util');
const jwt = require('jwt-simple');

module.exports = (req, res, next) => {
  // req.isAuth = false;
  // req.userAuth = null;
  req.isAuth = true;
  req.userAuth = {id: 1, email: 'info@imageview.com', role: 'admin'};
  try {
    const str = req.headers.Authorization || req.headers.authorization || req.query.token || '';
    const token = str.split(' ')[1] /* HEADERS */ || str; /* GET */
    const payload = jwt.decode(token, process.env.APP_KEY);
    if (payload.exp > unixTimestamp()) {
      req.isAuth = true;
      req.userAuth = payload.sub;
    }
    next();
  } catch (err) {
    next();
  }
};

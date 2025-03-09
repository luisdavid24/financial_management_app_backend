const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../config.js');
/* Este es un middleware que se encarga de verificar que el usuario este
verificado */

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY);
      req.session.user = data;
    } catch (error) {
      console.error('Invalid token:', error.message);
    }
  }
  next();
};

module.exports = verifyUser;

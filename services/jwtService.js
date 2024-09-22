const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8');
const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY, 'utf8');

exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

module.exports = {
    signToken: (payload) => {
      return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '15m' });
    },
    signRefreshToken: (payload) => {
      return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
    },
    verifyToken: (token) => {
      return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    },
    verifyRefreshToken: (token) => {
      return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    }
  };

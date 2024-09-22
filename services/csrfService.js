const crypto = require('crypto');

const csrfTokens = new Map();

const generateToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
    csrfTokens.set(token, true);
    return token;
};

const validateToken = (token) => {
    return csrfTokens.has(token);
};

module.exports = {
    generateToken,
    validateToken
};

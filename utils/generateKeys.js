const fs = require('fs');
const { generateKeyPairSync } = require('crypto');

const generateKeys = () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  fs.writeFileSync('./config/key/private.key', privateKey);
  fs.writeFileSync('./config/key/public.key', publicKey);
};

generateKeys();

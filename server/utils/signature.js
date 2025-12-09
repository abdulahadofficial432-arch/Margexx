// server/utils/signature.js
const crypto = require('crypto');

function sign(str, secret) {
  return crypto.createHmac('sha256', secret).update(str).digest('hex');
}

module.exports = { sign };


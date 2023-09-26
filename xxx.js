const crypto = require("crypto");


const x =crypto.randomBytes(32).toString('hex');
console.log(x)
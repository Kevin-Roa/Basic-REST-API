const functions = require('firebase-functions');
const app = require('./app');

exports.firstapi = functions.https.onRequest(app);

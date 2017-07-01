'use strict';
const functions = require('firebase-functions');

exports.aihook = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

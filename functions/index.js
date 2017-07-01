'use strict';
const functions = require('firebase-functions');
const _ = require('lodash');

const getAccessToken = () => 'marmelade';
const getServices = () => ['nails', 'beauty'];
const enumArray = (arr) => arr.join(' ');

exports.aihook = functions.https.onRequest((req, res) => {
  console.log('Body: ', req.body);
  res.setHeader('Content-Type', 'application/json');
  const scope = {};
  const result = {};
  scope.accessToken = _.get(req, 'body.result.parameters.accessToken');
  scope.intentName = _.get(req, 'body.result.metadata.intentName');

  console.log('Scope:', scope);
  Promise.resolve()
    .then(() => !scope.accessToken && getAccessToken())
    .then((accessToken) => scope.accessToken = accessToken)
    .then(() => !scope.services && getServices())
    .then((services) => {
      scope.services = services;
      result.speech = `Access token is ${scope.accessToken} and services are ${enumArray(services)}`;
      result.displayText = result.speech;
      console.log('Services:', services, result);
      res.send(JSON.stringify(result));
    });
});

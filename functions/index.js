'use strict';
const functions = require('firebase-functions');
const _ = require('lodash');

const getAccessToken = () => 'marmelade';
const getServices = () => ['nails', 'beauty'];
const enumArray = (arr) => (arr || []).reduce((acc, val, index) => arr + (
  index === arr.length ? '' : (index === arr.length - 1 ? ', ' : 'and ')
) + val);

const returnResult = (res, result, scope) => {
  result.displayText = result.speech;
  result.contextOut = [{
    name: 'booking',
    lifespan: 5,
    parameters: {
      accessToken: scope.accessToken
    }
  }];
  console.log('Result:', result);
  res.send(JSON.stringify(result));
};

exports.aihook = functions.https.onRequest((req, res) => {
  //console.log('Body: ', req.body);
  res.setHeader('Content-Type', 'application/json');
  const scope = {};
  const result = {
    speech: 'Hello my friend!'
  };
  // insert parameters in the scope
  Object.assign(scope, _.get(req, 'body.result.parameters', {}));
  // get the intent
  scope.intentName = _.get(req, 'body.result.metadata.intentName');
  console.log('Scope:', scope);
  Promise.resolve()
    .then(() => !scope.accessToken && getAccessToken())
    .then((accessToken) => scope.accessToken = accessToken)
    .then(() => !scope.services && getServices())
    .then((services) => scope.services = services)
    .then(() => {
      if (scope.intentName === 'Welcome') {
        result.speech = scope.accessToken ? `You are authenticated as ${scope.accessToken}`: 'You are not authenticated!';
      } else if (scope.intentName === 'Services') {
        result.speech = scope.services ? `Your services are ${enumArray(scope.services)}`: 'You have no services!';
      }
    })
    .then(() => returnResult(res, result, scope))
    .catch((err) => {
      console.log('Catch error:', err);
      result.speech = 'An error has occured!';
      returnResult(res, result);
    });
});

'use strict';

const a = {
  id: 'f5ef4714-23f4-4ceb-8308-9861c55d6b81',
  timestamp: '2017-07-01T11:46:27.574Z',
  lang: 'en',
  result:
   { source: 'agent',
     resolvedQuery: 'hello man',
     speech: '',
     action: 'input.unknown',
     actionIncomplete: false,
     parameters: {},
     contexts: [],
     metadata:
      { intentId: 'bd80e313-e32c-4528-9b6e-738783884867',
        webhookUsed: 'true',
        webhookForSlotFillingUsed: 'false',
        intentName: 'Default Fallback Intent' },
     fulfillment:
      { speech: 'I didn\'t get that. Can you say it again?',
        messages: [Object] },
     score: 1 },
  status: { code: 200, errorType: 'success' },
  sessionId: 'bd33f16c-018a-459e-aca6-33f867a989ac'
};
console.log(a);
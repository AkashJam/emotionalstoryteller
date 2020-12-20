const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY,
  }),
  serviceUrl: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
});

async function detectEmotion(result) {
  const analyzeParams = {
    'text': result,
    'features': {
      'emotion': {
      }
    }
  };

  var results = await naturalLanguageUnderstanding.analyze(analyzeParams); 

  var result = results.result.emotion.document.emotion
  // console.log(result)
  console.log(result)
  var intensity = 0;
  for( let prop in result ){
    if (intensity<=result[prop]){
      intensity = result[prop]
      var emot = prop
        }
    }
  return emot
}
module.exports = detectEmotion
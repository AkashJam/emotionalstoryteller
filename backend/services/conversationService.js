const conversationDAO = require('../DAO/conversationDAO');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

path = __dirname
process.env.GOOGLE_APPLICATION_CREDENTIALS = `${path}/chatbot-test-bicu-96c40f63fb5b.json`;
const sessionId = uuid.v4();
const projectId = 'chatbot-test-bicu';

module.exports = {
    conversation: async (query) => {   
        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
        // The text query request.
        const request = {
        session: sessionPath,
        queryInput: {
            text: {
            // The query to send to the dialogflow agent
            text: query,
            // The language used by the client (en-US)
            languageCode: 'en-US',
            }, 
        }, 
        };
    
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(result.intent.name);
        //console.log(result)
        //console.log(result.fulfillmentMessages[0].text.text[0])
        let whattosuggest = result.intent.displayName;
        console.log(whattosuggest)
        switch (whattosuggest) {
            case 'Story Intro':
                suggest = [ "Happy", "Angry", "Afraid" ]
                break;
            case 'Emotion_1_wrong_fallback':
                suggest = [ "Happy", "Angry", "Afraid" ]
                break;
            case 'Emotion_1_correct':
                suggest = [ "Hide", "Fight", "Cry", "Laugh" ]
                break;

            default:
                suggest = [ "Yes", "No"]
                break;
        }
        let imgurl = result.intent.name.split('/')
        imgurl = imgurl[imgurl.length - 1];
        return {
            response: result.fulfillmentMessages[0].text.text[0],
            context: {
                type: result.action
            },
            suggestions: suggest,
            imgurl: imgurl + '.jpg'
        }

        //If we need to do something in the DB we have to call the DAO class
        //return conversationDAO.startConversation();
    },
};

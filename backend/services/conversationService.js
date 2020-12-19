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
        console.log(result)
        let whattosuggest = result.intent.displayName;
        switch (whattosuggest) {
            case 'Story Intro':
                suggest = [ "Sad", "Happy", "Angry", "Afraid" ]
                break;

            default:
                suggest = [ "Yes", "No"]
                break;
        }
        return {
            response: result.fulfillmentText,
            context: {
                type: result.action
            },
            suggestions: suggest,
            imgurl: ''
        }

        //If we need to do something in the DB we have to call the DAO class
        //return conversationDAO.startConversation();
    },
};

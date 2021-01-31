const conversationDAO = require('../DAO/conversationDAO');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

path = __dirname
process.env.GOOGLE_APPLICATION_CREDENTIALS = `${path}/chatbot-test-bicu-96c40f63fb5b.json`;
const sessionId = uuid.v4();
const projectId = 'chatbot-test-bicu';
sections = []
newcontext = true

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
        // console.log('Detected intent');
        const result = responses[0].queryResult;
        contexts = result.action.split(',')
        replies = []//result.fulfillmentMessages[0].text.text[0]
        // If we want to use multiple text responses
        // console.log(result.fulfillmentMessages)
        for(let reply in result.fulfillmentMessages){
            // console.log(reply)
            replies[reply] = result.fulfillmentMessages[reply].text.text[0]
        }
        // console.log(replies)
        
        for(let context in contexts){
            if(contexts[context]=='OPEN-CONV'){
                sections=[]
            }
            if (contexts[context]!='OPEN-CONV'&&contexts[context]!='STORY-CONC') {
                for(let section in sections){
                    // console.log(section)
                    if(sections[section]==contexts[context]){
                        newcontext = false
                    }
                }
                if(newcontext){
                    sections.push(contexts[context])
                }
                newcontext = true
                // console.log(sections)
            }
        }

        let intentID = result.intent.name.split('/')
        intentID = intentID[intentID.length - 1];
        console.log('this is the name of the intent: ' + intentID)
        console.log(result.intent.displayName)
        // console.log('these are the images: ' + images[`${intentID}`])
        // Getting the suggestions and images for the detected intent
        dbquery = await conversationDAO.intentAssests(intentID)
        try {
            suggest = dbquery.suggestion.split(',')
        } catch (error) {
            suggest = null
        }
        try {
            images = dbquery.image_url.split(',')
        } catch (error) {
            images = null
        }

        return {
            response: replies,
            context: {
                type: contexts
            },
            suggestions: suggest,
            imgurl: images
        }
    },
    history: async () => {
        sections.push('continue')
        return sections
    },
};

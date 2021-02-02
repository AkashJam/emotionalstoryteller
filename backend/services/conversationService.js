const intentDAO = require('../DAO/intentDAO');
const sessionDAO = require('../DAO/sessionDAO');
const dialogflow = require('@google-cloud/dialogflow');

require('dotenv').config({ path: '../.env' })

const projectId = 'chatbot-test-bicu';
// sections = []
newcontext = true

module.exports = {
    conversation: async (query,sessionId) => {  
        // console.log(sessionId)
        // Create a new session in database if it does not exist
        notExist = await sessionDAO.sessionNotExists(sessionId)
        // console.log(notExist)
        if(notExist){
            await sessionDAO.createSession(sessionID)
        }
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
        dbquerySession = await sessionDAO.selectSession(sessionID)
        sections = dbquerySession.sections
        // To check for changes needs to be made into the database
        initialsections = sections
        // console.log(`${initialsections},${sections}`)

        // For accepting multiple text responses from dialogflow
        replies = []
        for(let reply in result.fulfillmentMessages){
            replies[reply] = result.fulfillmentMessages[reply].text.text[0]
        }
        // console.log(replies)
        
        for(let context in contexts){
            if(contexts[context]=='OPEN-CONV'){
                sections = 'none'
            }
            if (contexts[context]!='OPEN-CONV'&&contexts[context]!='STORY-CONC') {
                if(sections=='none'){
                    sections = contexts[context]
                }
                section = sections.split(',')
                for(let num in section){
                    if(section[num]==contexts[context]){
                        newcontext = false
                    }
                }
                if(newcontext){
                    sections = `${sections},${contexts[context]}`
                }
                newcontext = true
                // console.log(sections)
            }
        }

        let intentID = result.intent.name.split('/')
        intentID = intentID[intentID.length - 1];
        // console.log('this is the name of the intent: ' + intentID)
        // console.log(result.intent.displayName)
        
        // Getting the suggestions and images for the detected intent
        dbqueryAssets = await intentDAO.intentAssets(intentID)
        try {
            suggest = dbqueryAssets.suggestion.split(',')
        } catch (error) {
            suggest = null
        }
        try {
            images = dbqueryAssets.image_url.split(';')
            for(let image in images){
                images[image] = images[image].split(',')
                if(images[image]==''){
                    images[image]=null
                }
            }
        } catch (error) {
            images = null
        }
        // console.log(images)
        
        if(sections!=initialsections){
            await sessionDAO.updateSessionSections(sessionID,sections)
            // console.log(`${sessionId},${sections},${initialsections}`)
        }

        return {
            response: replies,
            context: {
                type: contexts
            },
            suggestions: suggest,
            imgurl: images
        }
    }
};

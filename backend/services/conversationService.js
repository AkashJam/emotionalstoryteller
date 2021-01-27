const conversationDAO = require('../DAO/conversationDAO');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

path = __dirname
process.env.GOOGLE_APPLICATION_CREDENTIALS = `${path}/chatbot-test-bicu-96c40f63fb5b.json`;
const sessionId = uuid.v4();
const projectId = 'chatbot-test-bicu';

// const images = {
//     '84a31010-99d5-4cd5-ad54-3fdf8d429ded': ['1-NOISE.png'],
//     '5c22d783-1b31-4967-afdd-da4e9aeb2d28': ['1-NOISE.png'],
//     'f3dd9cb2-455c-407e-a5c4-4602b5426519': ['2-DUVET.png'],
//     '7ace83b5-b161-4f4c-a745-0e7f20b9afe5': ['sadness-01.png','sadness-02.png','sadness-03.png'],
//     '6c07c7ae-45df-4361-93bc-3ca73d6db395': ['fear-01.png','fear-02.png','fear-03.png'],
//     '29a83225-c329-4428-929d-4216607cd316': ['angry-01.png','angry-02.png','angry-03.png'],
//     'ecacc399-94cf-41d2-8c68-c3cafa67e846': ['happiness-01.png','happiness-02.png','happiness-03.png'],
//     'f65e2727-7df7-4386-b4ab-3da2a8e5eb4e': ['surprised-01.png','surprised-02.png','surprised-03.png'],
//     'bd5856db-8a5c-4c17-a323-a24dcd9825f4': ['neutral-01.png','neutral-02.png','neutral-03.png'],
// }

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
        //console.log(result.intent.name);
        replies = []
        console.log(result.fulfillmentMessages)
        for(let reply in result.fulfillmentMessages){
            console.log(reply)
            replies[reply] = result.fulfillmentMessages[reply].text.text[0]
        }
        
        console.log(replies)

        //For providing suggestions
        // let whattosuggest = result.intent.displayName;
        // console.log(whattosuggest)
        // switch (whattosuggest) {
        //     case 'Story Intro':
        //         suggest = [ "Happy", "Angry", "Afraid" ]
        //         break;
        //     case 'Emotion_1_wrong_fallback':
        //         suggest = [ "Happy", "Angry", "Afraid" ]
        //         break;
        //     case 'Emotion_1_correct':
        //         suggest = [ "Hide", "Fight", "Cry", "Laugh" ]
        //         break;

        //     default:
        //         suggest = [ "Yes", "No"]
        //         break;
        // }
        let intentID = result.intent.name.split('/')
        intentID = intentID[intentID.length - 1];
        // console.log('this is the name of the intent: ' + intentID)
        // console.log(result.intent.displayName)
        // console.log('these are the images: ' + images[`${intentID}`])
        // Getting the suggestions and images for the detected intent
        dbquery = await conversationDAO.intentAssests(intentID)
        try {
            suggest = dbquery.suggestion.split(',')
            images = dbquery.image_url.split(',')
        } catch (error) {
            suggest = null
            images = null
        }
        // console.log(suggest)
        // console.log(images)

        return {
            response: replies,
            context: {
                type: result.action
            },
            suggestions: suggest,
            imgurl: images //[`${intentID}`]
        }

        //If we need to do something in the DB we have to call the DAO class
        //return conversationDAO.startConversation();
    },
};

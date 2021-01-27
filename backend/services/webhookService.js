const conversationDAO = require('../DAO/conversationDAO');
const emotionDetect = require('./emotionDetectionService')

usertext = ''

module.exports = {
    webhook: async (reply) => {
        // console.log(reply)
        let intentID = reply.queryResult.intent.name.split('/')
        intentID = intentID[intentID.length - 1];
        // console.log('this is the name of the intent: ' + intentID)
        // console.log(reply.queryResult.intent.displayName)
        response = reply.queryResult.fulfillmentMessages[0].text.text[0]
        if(usertext==''){
            usertext = reply.queryResult.queryText
        }
        else{
            usertext = `${usertext}. ${reply.queryResult.queryText}`
        } 
        if(reply.queryResult.action=='OPEN-CONV'){
            if(response!='end'){
                eventname = null
            }
            else{
                try {
                    const emotion = await emotionDetect(usertext)
                    dbquery = await conversationDAO.intentAssests(intentID)
                    eventname = dbquery[`${emotion}`]
                } catch (error) {
                    eventname = null
                }
                if(eventname!=null){
                    usertext = ''
                }
            }
        }
        else{
            try {
                const emotion = await emotionDetect(usertext)
                dbquery = await conversationDAO.intentAssests(intentID)
                eventname = dbquery[`${emotion}`]
            } catch (error) {
                eventname = null
            }
            if(eventname!=null){
                usertext = ''
            }
        }
        // console.log(eventname)
        // Detect emotion from user's query text

        // switch (emotion) {
        //     case 'sadness':
        //         chatresponse = 'Your behavior shows that you are a little bit overwhelmed by this situation, which makes you sad. When you are sad you can talk with your parents or your friends. They can help you to fix your problem and can find a way to cheer you up !'
        //         break;
        //     case 'joy':
        //         chatresponse = 'The situation seems to amuse you. You seem happy ! Happiness is a good emotion and it helps us understand what we like and what makes us feel good. We should keep doing the things that make us happy.'
        //         break;
        //     case 'fear':
        //         chatresponse = 'You and Peter are both afraid of this noise, because you do not know what is happening. Peter hears a noise again and a little blue monster jumps out of under the bed !  It is normal to feel scared in unknown situations. Try to identify the things that make you scared and think about why that is happening'
        //         break;
        //     case 'anger':
        //         chatresponse = 'You do not understand what is happening. You and Peter are losing your patience, when a little monster jumps out of under the bed. You must feel a little bit angry ! Anger is an emotion that can hurt not only yourself, but also the ones around you. When you are angry, try to think of your favourite person or toy, and imagine yourself hugging them. I bet you already forgot about being angry!'
        //         break;
        
        //     default:
        //         chatresponse = 'I was unable to unnderstand what you said.'
        //         break;
        // }
        // Create webhook response inaccordance with dialogflow response syntax
        return JSON.stringify({
            "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      response
                    ]
                  }
                }
              ],
            "followupEventInput": {
                "name": eventname,
                "parameters": {
                  "parameter-name-1": "parameter-value-1",
                  "parameter-name-2": "parameter-value-2"
                },
                "languageCode": "en-US"
              }
          })
    }
}






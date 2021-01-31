const conversationDAO = require('../DAO/conversationDAO');
const emotionDetect = require('./emotionDetectionService')
const conversationService = require('./conversationService')
require('dotenv').config({ path: '../.env' })

usertext = ''
firstconclusion = true
conclusionnumber = 0

module.exports = {
    webhook: async (reply) => {
        //console.log(reply)
        let intentID = reply.queryResult.intent.name.split('/')
        intentID = intentID[intentID.length - 1];
        // console.log('this is the name of the intent: ' + intentID)
        // console.log(reply.queryResult.intent.displayName)
        response = reply.queryResult.fulfillmentMessages[0].text.text[0]
        frontendcontext = reply.queryResult.action//.split(',')
        console.log(frontendcontext)
        if(usertext==''){
            usertext = reply.queryResult.queryText
        }
        else{
            usertext = `${usertext}. ${reply.queryResult.queryText}`
        } 
        if(frontendcontext=='OPEN-CONV'){
            if(response!='end'){
                eventname = null
                //console.log(response)
            }
            else{
                try {
                    // console.log(usertext)
                    const emotion = await emotionDetect(usertext)
                    // console.log(emotion)
                    dbquery = await conversationDAO.storyAssests(emotion)
                    eventname = dbquery.event_name
                    // console.log(eventname)
                    if(eventname!=null){
                        usertext = ''
                    }
                } catch (error) {
                    dbquery = await conversationDAO.storyAssests()
                    eventname = dbquery.event_name
                    // console.log(error)
                }
            }
        }
        else if(frontendcontext=='STORY-CONC'){
            if(firstconclusion){
                conclusions = await conversationService.history()
                // console.log(conclusions)
                firstconclusion = false
            }
            // .log(conclusions[conclusionnumber])
            dbquery = await conversationDAO.conclusionAssets(conclusions[conclusionnumber])
            eventname = dbquery.event_name
            // console.log(eventname)
            if(conclusions[conclusionnumber]=='continue'){
                conclusionnumber = 0
                firstconclusion = true
            }
            else{
                conclusionnumber += 1
            }
            usertext = ''
        }
        else{
            try {
                console.log(usertext)
                const emotion = await emotionDetect(usertext)
                console.log(emotion)
                dbquery = await conversationDAO.intentAssests(intentID)
                eventname = dbquery[`${emotion}`]
                console.log(eventname)
                if(eventname!=null){
                    usertext = ''
                }
            } catch (error) {
                eventname = null
            }
        }
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






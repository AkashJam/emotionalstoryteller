const intentDAO = require('../DAO/intentDAO');
const storyDAO = require('../DAO/storyDAO');
const conclusionDAO = require('../DAO/conclusionDAO');
const sessionDAO = require('../DAO/sessionDAO');
const emotionDetect = require('./emotionDetectionService')
require('dotenv').config({ path: '../.env' })

module.exports = {
    webhook: async (reply) => {
        // console.log(reply.session)
        let sessionID = reply.session.split('/')
        sessionID = sessionID[sessionID.length - 1];
        response = reply.queryResult.fulfillmentMessages[0].text.text[0]
        frontendcontext = reply.queryResult.action.split('-')
        frontendcontext = frontendcontext[frontendcontext.length - 1]
        // console.log(frontendcontext)
        dbquerySession = await sessionDAO.selectSession(sessionID)
        usertext = dbquerySession.responses
        // console.log(`text from db is ${usertext}`)
        // To check if the value changed from that in the database
        initialtext = usertext 
        if(usertext=='none'){
            usertext = reply.queryResult.queryText
        }
        else{
            usertext = `${usertext}. ${reply.queryResult.queryText}`
        } 
        // console.log(msg)
        let intentID = reply.queryResult.intent.name.split('/')
        intentID = intentID[intentID.length - 1];
        // console.log('this is the name of the intent: ' + intentID)
        // console.log(reply.queryResult.intent.displayName)
        // console.log(frontendcontext)
        
        if(frontendcontext=='CONV'){
            if(response!='end'){
                eventname = null
                //console.log(response)
            }
            else{
                //since if the text used for detecting emotion is too small, ibm-watson api throws an error
                try{
                    // console.log(usertext)
                    const emotion = await emotionDetect(usertext)
                    // console.log(emotion)
                    dbqueryAssets = await storyDAO.storyAssets(emotion)
                    eventname = dbqueryAssets.event_name
                } catch (error) {
                    dbqueryAssets = await storyDAO.storyAssets()
                    eventname = dbqueryAssets.event_name
                }
                // console.log(eventname)
            }
        }
        else if(frontendcontext=='CONC'){
            conclusions = dbquerySession.sections
            conclusionnumber = dbquerySession.conclusion_no
            conclusion = conclusions.split(',')
            if(conclusionnumber==0 && conclusions!='none'){
                conclusions = `${conclusions},continue`
                conclusion = conclusions.split(',')
                // console.log(conclusions)
                await sessionDAO.updateSessionSections(sessionID,conclusions)
            }
            // console.log(conclusions[conclusionnumber])
            dbqueryAssets = await conclusionDAO.conclusionAssets(conclusion[conclusionnumber])
            eventname = dbqueryAssets.event_name
            // console.log(eventname)
            if(conclusion[conclusionnumber]=='continue'){
                conclusionnumber = 0
                conclusions='none'
            }
            else{
                conclusionnumber += 1
            }
            await sessionDAO.updateSessionConclusions(sessionID,conclusionnumber)
        }
        else{
            try {
                console.log(usertext)
                const emotion = await emotionDetect(usertext)
                console.log(emotion)
                dbqueryAssets = await intentDAO.intentAssets(intentID)
                eventname = dbqueryAssets[`${emotion}`]
                if(eventname=='incorrect'){
                    eventname = null
                    usertext = 'none'
                }
                console.log(eventname)
            } catch (error) {
                eventname = null
            }
        }

        if(eventname!=null){
            usertext = 'none'
        }

        if(usertext!=initialtext){
            await sessionDAO.updateSessionResponses(sessionID,usertext)
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






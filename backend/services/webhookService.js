
const emotionDetect = require('./emotionDetectionService')

module.exports = {
    webhook: async (reply) => {
        //console.log(reply)
        // Detect emotion from user's query text
        const res = await emotionDetect(reply.queryResult.queryText)
        //console.log(res)

        // Create webhook response inaccordance with dialogflow response syntax
        return JSON.stringify({
            "fulfillmentMessages": [
            {
                "text": {
                "text": [
                    reply.queryResult.queryText
                ]
                }
            }
            ],
            "outputContexts": [
            {
                "name": `${reply.session}/contexts/Storyteller-Happy-followup`,
                "lifespanCount": 5,
            }
            ]
        })
    }
}






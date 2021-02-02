const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    intentAssets: async (id) => {
        try {
            await database.select().where('intent_id',id).from('intent').then(function(data) {
                //console.log(data)
                result = data[0]
                sug = result.suggestions
                img = result.image_urls
                sadness = result.sadness,
                joy = result.joy,
                fear = result.fear,
                disgust = result.disgust,
                anger = result.anger
            })
          }
        catch(err) {
            sug = null
            img = null
            sadness = null
            joy = null
            fear = null
            disgust = null
            anger = null
            // console.log("wrong intent_id")
        }      
        // console.log(result)
        return {suggestion: sug,
            image_url: img,
            sadness: sadness,
            joy: joy,
            fear: fear,
            disgust: disgust,
            anger: anger
        }
    },
};
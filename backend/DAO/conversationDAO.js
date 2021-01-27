const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    intentAssests: async (id) => {
        try {
            await database.select().where('intent_id',id).from('intent').then(function(data) {
                //console.log(data[0])
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
    storyAssests: async (emotion) => {
        try {
            await database.select('event_name').where('emotion',emotion).from('story').then(function(data) {
                console.log(data[0])
                result = data[0]
                ev = result.event_name
            })
          }
        catch(err) {
            await database.select('event_name').from('story').then(function(data) {
                console.log(data[0])
                result = data[0]
                ev = result.event_name
            })
        }      
        // console.log(result)
        return {event_name: ev
        //     image_url: img,
        //     sadness: sadness,
        //     joy: joy,
        //     fear: fear,
        //     disgust: disgust,
        //     anger: anger
        }
    }
};
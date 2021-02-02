const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    storyAssets: async (emotion) => {
        try {
            await database.select('event_name').where('emotion',emotion).from('story').then(function(data) {
                result = data[0]
                ev = result.event_name
            })
          }
        catch(err) {
            await database.select('event_name').from('story').then(function(data) {
                result = data[Math.floor(Math.random() * data.length)]
                ev = result.event_name
                // console.log(emotion)
            })
        }      
        // console.log(result)
        return {event_name: ev
        }
    },
};
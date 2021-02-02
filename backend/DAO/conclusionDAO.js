const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    conclusionAssets: async (section) => {
        try {
            await database.select('event_name').where('section_name',section).from('conclusion').then(function(data) {
                result = data[0]
                ev = result.event_name
            })
          }
        catch(err) {
            await database.select('event_name').where('section_name','continue').from('conclusion').then(function(data) {
                result = data[0]
                ev = result.event_name
                // console.log(emotion)
            })
        }      
        // console.log(result)
        return {event_name: ev
        }
    },
};
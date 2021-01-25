const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    intentAssests: async (id) => {
        try {
            await database.select().where('intent_id',id).from('story').then(function(data) {
                //console.log(data[0])
                result = data[0]
                sug = result.suggestions
                img = result.image_urls
            })
          }
        catch(err) {
            sug = 'Yes, No'
            img = null
        }      
        //console.log(result)
        return {suggestion: sug,
            image_url: img}
    }
};
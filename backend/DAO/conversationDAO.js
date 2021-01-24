const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    intentAssests: async () => {
        await database.select().from('story').then(function(data) {
            //console.log(data[0])
            result = data[0]
        })
        //console.log(result)
        return {suggestion: result.suggestions.toString(),
            image_url: result.image_urls}
    }
};
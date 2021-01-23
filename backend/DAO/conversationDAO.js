const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    startConversation: async () => {
        await database.select().from('story').then(function(data) {
            console.log(data[0])
            result = data[0].suggestions
        })
        console.log(result)
        return result
    }   
};
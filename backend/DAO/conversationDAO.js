const { from } = require('../DB/connection');
const database = require('../DB/connection');

module.exports = {
    startConversation: () => {
        database.select('suggestions').from('story').then(function(data) {
            //console.log(data[0].suggestions)
        return data[0].suggestions
        })
    }

    
};
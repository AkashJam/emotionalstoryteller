const database = require('../DB/connection');

module.exports = {
    startConversation: () => {
        return database('conversation')
            .select();
    }
};
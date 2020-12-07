const conversationDAO = require('../DAO/conversationDAO');

module.exports = {
    startConversation: () => {   
        return true; 

        //If we need to do something in the DB we have to call the DAO class
        return conversationDAO.startConversation();
    },
};
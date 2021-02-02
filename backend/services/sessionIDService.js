const uuid = require('uuid');
const sessionDAO = require('../DAO/sessionDAO');

module.exports = {
    generateSessionID: async () => {
        sessionID = uuid.v4()
        return sessionID
    }
}
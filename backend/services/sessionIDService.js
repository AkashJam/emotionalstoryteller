const uuid = require('uuid');

module.exports = {
    generateSessionID: async () => {
        sessionId = uuid.v4()
        return sessionId
    }
}
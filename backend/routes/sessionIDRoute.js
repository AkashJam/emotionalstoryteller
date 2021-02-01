const router = require('express').Router();

const sessionService = require('../services/sessionIDService')

router.get("/generateSessionID", async (req, res, next) => {
    const sessionID = await sessionService.generateSessionID();
    res.json({
            sessionID: sessionID
        });
});

module.exports = router;
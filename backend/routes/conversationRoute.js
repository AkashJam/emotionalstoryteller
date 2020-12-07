const router = require('express').Router();

const conversationService = require('../services/conversationService')

router.get("/start", async (req, res, next) => {
    const welcomeMessage = await conversationService.startConversation();
    res.json(welcomeMessage);

});

module.exports = router;
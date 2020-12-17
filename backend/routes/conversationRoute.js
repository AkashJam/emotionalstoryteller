const router = require('express').Router();

const conversationService = require('../services/conversationService')

router.get("/start", async (req, res, next) => {
    const Message = await conversationService.Conversation('hi');
    res.json({response: `${Message}`, context:{name: "OPEN-CONV"}, imgurl: "", suggestions: ["Yes", "No"]});

});

router.get("/continue", async (req, res, next) => {
    var userreply = req.body.query;
    const Message = await conversationService.Conversation(userreply);
    res.json({response: `${Message}`, context:{name: "OPEN-CONV"}, imgurl: "", suggestions: ["Yes", "No"]});

});

module.exports = router;
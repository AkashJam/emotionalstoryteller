const router = require('express').Router();

const conversationService = require('../services/conversationService')

// router.get("/start", async (req, res, next) => {
//     const message = await conversationService.conversation('hi');
//     res.json({
//         userMessage: req.body.query,
//         chatResponse: message
//     });

// });

router.post("/nextresponse", async (req, res, next) => {
    var userreply = req.body.query;
    const message = await conversationService.conversation(userreply);
    res.json({
            userMessage: req.body.query,
            chatResponse: message
        });
});

router.post("/speechToText", async (req, res, next) => {
    var userreply = req.body.query;
    const message = await conversationService.conversation(userreply);
    res.json({
            userMessage: req.body.query,
            chatResponse: {
                response: message,
                context: {
                    type: "OPEN-CONV"
                },
                suggestions: [ "Yes", "No" ],
                imgurl: ''
            }
            // {
            //      userMessage: req.body.query,
            //      chatResponse: message
            // }
        });
});



module.exports = router;
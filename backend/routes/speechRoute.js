const router = require('express').Router();

const speechService = require('../services/speechService')

router.get("/textFromSpeech", async (req, res, next) => {
    var audio = req.body.audio;
    const text = await speechService.getTextFromSpeech(audio);
    res.json({
            text: text,
            audioBase64: audio
        });
});

module.exports = router;
const router = require('express').Router();

const speechService = require('../services/speechService')

router.post("/textFromSpeech", async (req, res, next) => {
    var audio = req.body.audio;
    const text = await speechService.getTextFromSpeech(audio);
    res.json({
            text: text,
            audioBase64: audio
        });
});

router.post("/speechFromText", async (req, res, next) => {
    var text = req.body.text;
    const audio = await speechService.getSpeechFromText(text);
    res.json({
            text: text,
            audioBuffer: audio
        });
});

module.exports = router;
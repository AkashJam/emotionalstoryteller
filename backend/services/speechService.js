
const conversationDAO = require('../DAO/conversationDAO');
const uuid = require('uuid');

path = __dirname
process.env.GOOGLE_APPLICATION_CREDENTIALS = `${path}/chatbot-test-bicu-96c40f63fb5b.json`;
const sessionId = uuid.v4();
const projectId = 'chatbot-test-bicu';


// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new speech.SpeechClient();
const ttsclient = new textToSpeech.TextToSpeechClient()

module.exports = {
    getTextFromSpeech: async (audio) => {
        // The path to the remote LINEAR16 file
        // const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        // const audio = {
        //     uri: gcsUri,
        // };

        const audioData = audio.dataURL.split(',').pop();
        let fileBuffer = Buffer.from(audioData, 'base64');
            // run the simple transcribeAudio() function
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: {
                content:fileBuffer
            },
            config: config,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
        return transcription;
    },

    getSpeechFromText: async (text) => {
        const request = {
            input: {text: text},
            // Select the language and SSML voice gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'LINEAR16', pitch: '5.0' },
        };

        const response = await ttsclient.synthesizeSpeech(request);

        return response[0].audioContent;
    }
};

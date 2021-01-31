import Vue from 'vue'
require('dotenv').config({ path: '@/../.env' })

let api = new Vue({
    methods: {
        post: async (path,data) => {
            let result = await fetch(process.env.VUE_APP_API_LINK + path, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
            return result;

        },
        sendMessage: async (message) => {
            let result = await api.post("/api/nextresponse", {
                query: message
            });
            console.log('sending user response to API....')
            return result;
        },
        getTextFromSpeech: async (audio) => {

            let textResult = await api.post('/textFromSpeech', audio)
                .catch(error => {
                    console.log(error); 
                });
            return textResult;

        },
        getAudioMessage: async (text) => {
            return await api.post('/speechFromText', {
                text: text
            }).catch((error) => {
                console.log(error)
            })
        }
    }
});

export default api;
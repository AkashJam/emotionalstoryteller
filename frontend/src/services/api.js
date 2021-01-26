import Vue from 'vue'

let api = new Vue({
    data() {
        return {
            api_root:'http://localhost:3000'
        }
    },
    methods: {
        post: async (path,data) => {
            let result = await fetch(api.api_root + path, {
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
    }
});

export default api;
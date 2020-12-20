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
            return result;
        },
        getTextFromSpeech: () => {
            const reader = new FileReader();
            reader.readAsDataURL(this.audioBlob);
            reader.onload = () => {
                const base64AudioMessage = reader.result.split(',')[1];

                api.post('/speechToText', {
                    message: base64AudioMessage
                }).then(res => {
                    if (res.status === 201) {
                        // return populateAudioMessages();
                        console.log(res)
                    }
                    console.log('Invalid status saving audio message: ' + res.status);
                })
            };
        }
    }
});

export default api;
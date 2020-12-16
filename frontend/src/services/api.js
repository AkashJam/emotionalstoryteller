import Vue from 'vue'

let api = new Vue({
    data() {
        return {
            api_root:'http://localhost:3000'
        }
    },
    methods: {
        post: (path,data) => {
            return fetch(api.api_root + path, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
        },
        sendMessage: (message) => {
            // return api.post("/message", {
            //     message: message
            // });
            return {
                userMessage: message,
                chatResponse: {
                    response: "Great! Would you like to hear a story?",
                    context: {
                        type: "OPEN-CONV"
                    },
                    suggestions: [ "Yes", "No" ],
                    imgurl: ''
                }
            }
        }
    }
});

export default api;
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
                body: JSON.stringify(data) ,
                mode: 'no-cors'
            });

            console.log(result);
            return result;

        },
        sendMessage: async (message) => {
            let result = await api.post("/nextresponse", {
                query: message
            });
            return result;

            //  await api.post("/nextresponse", {
            //         query: message
            //     }).then(response => {
            //         console.log(response);
            //     })

            // .catch(error => {
            //     console.log(error)
            // });
            // return {
            //     userMessage: message,
            //     chatResponse: {
            //         response: "Great! Would you like to hear a story?",
            //         context: {
            //             type: "OPEN-CONV"
            //         },
            //         suggestions: [ "Yes", "No" ],
            //         imgurl: ''
            //     }
            // }
        }
    }
});

export default api;
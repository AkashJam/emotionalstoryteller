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
            let result = await api.post("/nextresponse", {
                query: message
            });
            return result;
        }
    }
});

export default api;
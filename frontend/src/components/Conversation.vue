<template>
    <div class="conversation">
        <message v-for="(message, index) in messages" :key="index" :message="message"></message>
    </div>        

</template>
<script>
import Message from './Message'
import bus from '../services/bus'
export default {
    // preserveAspectRatio="xMinYMin meet"
    components: {
        Message
    },
    data() {
        return {
            messages: [
                {
                    text: "Hi",
                    author: "BOT",
                    type: 'MESSAGE'
                },
                {
                    text:"Hello",
                    author: "USR",
                    type: 'MESSAGE'
                },
                {
                    text:"I am Berno. What's your name?",
                    author: "BOT",
                    type: 'MESSAGE'
                },
            ]   
        }
    },
    methods: {
        appendEvents: function() {
            bus.$on('new-user-message',(message)=> {
                this.messages.push({
                    text: message,
                    author: 'USR',
                    type: 'MESSAGE'
                });
            });
            bus.$on('response-received',(response)=>{
                this.messages.push({
                    text: response.chatResponse.response,
                    author: 'BOT',
                    type: 'MESSAGE'
                });
                let suggestions = response.chatResponse.suggestions;
                if(suggestions && suggestions.length > 0) {
                    setTimeout(()=>{
                            this.messages.push({
                                suggestions: suggestions,
                                type: 'SUGGESTIONS',
                                author: 'USR'
                            });
                        
                    },15000);
                }
            });
        }
    },
    mounted() {
        this.appendEvents();
    }


}
</script>


<style scoped>
.conversation{
    padding-top:150px;
    z-index: 1;
    padding-left: var(--es-page-margin-X);
    padding-right: var(--es-page-margin-X);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 150px;
}


</style>
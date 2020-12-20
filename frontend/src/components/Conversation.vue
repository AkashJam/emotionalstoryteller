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
        }
    },
    computed: {
        messages: function() {
            return this.$store.state.messages
        },
        // lastQuestionAnswered: function() {
        //     return this.$store
        // }
    },
    methods: {
        appendEvents: function() {
            bus.$on('new-user-message',(message)=> {
                this.$store.commit('addMessage',{
                    text: message,
                    author: 'USR',
                    type: 'MESSAGE'
                });
            });
            bus.$on('response-received',(response)=>{
                let currentIndex = this.messages.length;
                this.$store.commit('addMessage',{
                    text: response.chatResponse.response,
                    author: 'BOT',
                    type: 'MESSAGE', 
                    index: currentIndex
                });
                console.log(response)
                if(response.chatResponse.context && response.chatResponse.context.type ) {
                    if(response.chatResponse.context.type === 'SCARY-STORY') {
                        bus.$emit('story-mode', 'SCARY');
                    }
                }
                let suggestions = response.chatResponse.suggestions;
                if(suggestions && suggestions.length > 0) {
                    setTimeout(()=>{
                            if(this.messages[this.messages.length - 1].index === currentIndex) {
                                let suggestionMessage = {
                                    suggestions: suggestions,
                                    type: 'SUGGESTIONS',
                                    author: 'USR',
                                    index: currentIndex
                                };
                                this.messages.push(suggestionMessage); 

                                bus.$on('remove-suggestions', (indexOfMessage) => {
                                    let indexOfSuggestions = this.messages.indexOf(suggestionMessage);
                                    if(indexOfSuggestions > - 1 && indexOfSuggestions > indexOfMessage) {
                                        this.messages.splice(indexOfSuggestions, 1);
                                    }
                                })
                            }
                    },10000);
                }
            });
            
        },
        // startConversation: function()  {
        //     nextresponse
        // }
    },
    mounted() {
        this.appendEvents();
        // this.startConversation();
    }


}
</script>


<style scoped>
.conversation{
    z-index: 0;
    padding-left: var(--es-page-margin-X);
    padding-right: var(--es-page-margin-X);
    position: absolute;
    left: 0;
    right: 0;
    top: 150px;
    bottom: 150px;
    overflow: scroll;
}


</style>
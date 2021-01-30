<template>
    <div class="conversation" :class="[context]">
        <message v-for="(message, index) in messages" :key="index" :message="message"></message>
    </div>        

</template>
<script>
import Message from './Message'
import bus from '../services/bus'
import api from '../services/api'
import recorder from '../services/audio'

export default {
    // preserveAspectRatio="xMinYMin meet"
    components: {
        Message
    },
    data() {
        return { 
        }
    },
    props: {
        context: {
            type: String
        }
    },
    computed: {
        messages: function() {
            return this.$store.state.messages
        }
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
            bus.$on('response-received', async (response)=>{
                let currentIndex = this.messages.length;
                let audio = await api.getAudioMessage(response.chatResponse.response);                
                
                this.$store.commit('addMessage',{
                    text: response.chatResponse.response,
                    author: 'BOT',
                    type: 'MESSAGE', 
                    suggestions: response.chatResponse.suggestions,
                    imgurl: response.chatResponse.imgurl,
                    index: currentIndex,
                    audioBuffer: audio.audioBuffer.data
                });

                recorder.playMessage(audio.audioBuffer.data);

                console.log(response)
                if(response.chatResponse.context && response.chatResponse.context.type ) {
                    if(response.chatResponse.context.type !== this.$store.state.context) {
                        this.$store.commit('setContext', response.chatResponse.context.type)
                    }
                }
            });
            
        },
    },
    mounted() {
        this.appendEvents();
    },
    beforeDestroy() {
        bus.$off('new-user-message')
        bus.$off('response-received')
    }


}
</script>


<style scoped>
.conversation.OPEN-CONV{
    z-index: 0;
    padding-left: var(--es-page-margin-X);
    padding-right: var(--es-page-margin-X);
    position: absolute;
    left: 0;
    right: 0;
    top: 0px;
    bottom: 150px;
    overflow: scroll;
}

.conversation:not(.OPEN-CONV) {
    z-index: 0;
    padding-left: var(--es-page-margin-X);
    padding-right: var(--es-page-margin-X);
    position: absolute;
    left: 0;
    right: 0;
    top: 45%;
    overflow: scroll;
    height: 40%;
}

.conversation.OPEN-CONV .message:first-child {
    margin-top: 150px;
}

.conversation:not(.OPEN-CONV) .message:first-child {
    margin-top: 20px;
}

</style>
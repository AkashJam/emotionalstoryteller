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
            messageBufferQueue: [],
            isPlaying: false
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
    watch: {
        isPlaying: function (val) {
            if(!this.messageBufferQueue.length) return;
            if(!val) {
                recorder.playMessage(this.messageBufferQueue[0]);
                this.messageBufferQueue.shift();
            }
        },
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
                if(!response.chatResponse || !response.chatResponse.response || !response.chatResponse.response.length) return;
                let chatResponse = response.chatResponse;
                let currentIndex;

                for(let i=0; i<chatResponse.response.length; i++) {
                    currentIndex = this.messages.length;

                    let audio = await api.getAudioMessage(chatResponse.response[i]);                
                    
                    this.$store.commit('addMessage',{
                        text: chatResponse.response[i],
                        author: 'BOT',
                        type: 'MESSAGE', 
                        suggestions: (i === chatResponse.response.length - 1) ? chatResponse.suggestions : null,
                        imgurl: chatResponse.imgurl && chatResponse.imgurl.length ? chatResponse.imgurl[i] : null,
                        index: currentIndex,
                        audioBuffer: audio.audioBuffer.data,
                        context: chatResponse.context.type[i]
                    });

                    if(this.isPlaying) {
                        this.messageBufferQueue.push(audio.audioBuffer.data); 
                    } else {
                        this.isPlaying = true;
                        recorder.playMessage(audio.audioBuffer.data);
                    }

                    console.log(response)
                    if(chatResponse.context && chatResponse.context.type.length ) {
                        if(chatResponse.context.type[i] !== this.$store.state.context) {
                            this.$store.commit('setContext', chatResponse.context.type[i])
                        }
                    }
                }
            });
            
            bus.$on('stopped-playing', () => {
                this.isPlaying = false;
            })

            bus.$on('start-playing', () => {
                this.isPlaying = true;
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
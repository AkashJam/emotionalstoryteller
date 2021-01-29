<template>
    <div class="message" :class="message.author =='BOT'? 'bot-message' : 'user-message'" ref="messagebox">
        <div v-if="message.text" class="text-box">
            <div class="text">{{message.text}}</div>
            <div class="play-icon" v-if="message.author == 'BOT'">
                <img v-if="!playingMessage" src="../assets/icons/play.svg" @click="playMessage">
                <img v-if="playingMessage" src="../assets/icons/stop.svg" @click="stopPlayingMessage">
            </div>
        </div>
        <div v-if="message.suggestions && showSuggestions && !suggestionChosen" class="suggestions" ref="suggestionbox"> 
            <ul> 
                <li v-for="(suggestion, index) in message.suggestions" :key="index" @click="chooseSuggestion(suggestion)" >
                    {{suggestion}}
                </li>
            </ul>
        </div>
    </div>        

</template>
<script>
import bus from "../services/bus"
import api from "../services/api"
import recorder from '../services/audio'

export default {
    data() {
        return {
            suggestionChosen: false,
            showSuggestions: false,
            playingMessage: false
        }
    },
    props: {
        message: {
            type: Object
        }
    },
    methods: {
        chooseSuggestion: async function(suggestion) {
            this.suggestionChosen = true;
            this.showSuggestions = false;
            bus.$emit('remove-suggestions', this.message.index);
            bus.$emit('new-user-message', suggestion);
            let response = await api.sendMessage(suggestion);
            bus.$emit('response-received', response);
        },
        appendEvents: function() {
            if(this.message.suggestions && this.message.suggestions.length > 0) {
                setTimeout(()=>{
                    if(!this.suggestionChosen && this.$store.state.messages.length - 1 === this.message.index) {
                        this.showSuggestions = true;
                    }
                },10000);

                bus.$on('remove-suggestions', ()=>{
                    this.suggestionChosen = true;
                });
            }
        },
        playMessage: function() {
            this.playingMessage = true;
            recorder.playMessage(this.message.audioBuffer, () => {
                this.playingMessage = false;
            })
        },
        stopPlayingMessage: function() {
            recorder.stopPlayingMessage();
            this.playingMessage = false;
        }
    },
    mounted() {
        this.$refs.messagebox.scrollIntoView();
        this.appendEvents();
    },
    updated() {
        this.$refs.messagebox.scrollIntoView();
    }

}
</script>


<style scoped>
.message {
    font-size: 20px;
    color: var(--es-primary)
}
.message.user-message {
    text-align: right;
}
.message .text-box {
    background-color: var(--es-grey-light);
    box-shadow: var(--es-box-shadow);
    border-radius: var(--es-box-radius);
    padding: var(--es-box-padding);
    display: inline-block;
    width: fit-content;
    margin-bottom: 14px;
}

.message .text-box > * {
    display: inline-block;
}

.message .text-box .play-icon {
    padding: 0px 10px;
}

.message .text-box .play-icon img {
    width: 26px;
    vertical-align: bottom;
}

.message.user-message .text-box {
    background-color: var(--es-primary);
    color: white;
    font-weight: 600;
}

.message.bot-message .text-box {
    padding-right: 0;
}

.message.bot-message .text-box .text {
    width: calc(100% - 46px); 
}

.message .suggestions {
    text-align: right;
}

.message .suggestions li{
    text-align: right;
    display: inline-block;
    font-size: 24px;
    padding: 8px 12px;
    background-color:  var(--es-primary-light);
    border-radius: 6px;
    margin-left: 20px;
    font-weight: 400;
}
</style>
<template>
    <div class="input-message">
        <div class="buttons-bar">
            <button v-if="!recording" class="record" @click.stop="startRecording">Answer to Berno
                <img class="icon" src="../assets/icons/mic.svg">
            </button>
            <button v-if="recording" class="stop-recording" @click.stop="stopRecording">Stop Recording
                <img class="icon" src="../assets/icons/mic.svg">
            </button>
            <button class="send" @click.stop="sendMessage">Send message
                <img class="icon" src="../assets/icons/send.svg">
            </button>
        </div>
        
        <textarea v-model="message"></textarea>
        
    </div>        
</template>

<script>

import api from "../services/api"
import bus from "../services/bus"
import recorder from '../services/audio'

export default {
    // preserveAspectRatio="xMinYMin meet"

    data() {
        return {
            message: "",
            recording: false
        }
    },
    methods: {
        sendMessage: async function() {
            bus.$emit('new-user-message',this.message);
            let response = await api.sendMessage(this.message);
            bus.$emit('response-received', response);
            bus.$emit('remove-suggestions', null);
            this.message="";
        },
        startRecording: function() {
            console.log('start recording');
            this.recording = true;
            recorder.startRec();
        },
        stopRecording: async function() {
            console.log('stop recording')
            this.recording = false;
            let audioBlob = await recorder.stopRec();
            this.populateInputFromRecording(audioBlob);
        },
        populateInputFromRecording: async function(audioBlob) {
            const result = await api.getTextFromSpeech(audioBlob)
                .catch(()=>{
                    return '';
                });
            this.message += result.text;
            console.log(this.message);
            this.sendMessage();
        }
    }


}
</script>


<style scoped>
.input-message{
    padding-left: var(--es-page-margin-X);
    padding-right: var(--es-page-margin-X);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
}
.input-message > * {
    display: inline-block;
    vertical-align: middle;
}

.input-message textarea {
    height: 30px;
    width: calc(100% - var(--es-page-margin-X));
    border: 0;
    background-color: var(--es-grey-light);
    box-shadow: var(--es-box-shadow);
    border-radius: var(--es-box-radius);
    padding: var(--es-box-padding);
    outline: none;
    font-size: 18px;
    line-height: 24px;
    border: 1px solid #c1dbff;
}

.input-message textarea:focus{
    border: 2px solid var(--es-primary)
}

.input-message  .buttons-bar {
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 10px;
}

.input-message .buttons-bar button {
    border-radius: 24px;
    text-align: center;
    padding: 12px 16px;
    font-size: 16px;
    margin-right:10px;
    outline: none;
}

.input-message .buttons-bar button.record {
    background-color: var(--es-primary);
    color: white;
    border: 1px solid var(--es-primary);
}

.input-message .buttons-bar button.stop-recording {
    background-color: var(--es-accent);
    color: white;
    border: 1px solid var(--es-accent);
}

.input-message .buttons-bar button.send {
    background-color: var(--es-grey-light);
    color: var(--es-primary);
    border: 1px solid var(--es-primary);
}

.buttons-bar button img.icon {
    width: 18px;
    height: 18px;
    vertical-align: middle;
}
</style>
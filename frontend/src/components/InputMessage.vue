<template>
    <div class="input-message">
        <textarea v-model="message"></textarea>
        <button @submit.prevent="sendMessage" @click.prevent="sendMessage">SEND</button>
    </div>        
</template>

<script>

import api from "../services/api"
import bus from "../services/bus"

export default {
    // preserveAspectRatio="xMinYMin meet"

    data() {
        return {
            message: "" 
        }
    },
    methods: {
        sendMessage: async function() {
            bus.$emit('new-user-message',this.message);
            let response = await api.sendMessage(this.message);
            bus.$emit('response-received',response);
            bus.$emit('remove-suggestions', null);
            this.message="";
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
    bottom: 40px;
}
.input-message > * {
    display: inline-block;
    vertical-align: middle;
}

.input-message textarea {
    height: 60px;
    width: calc(100% - var(--es-page-margin-X) - 80px);
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

.input-message button {
    border: 0;
    border-radius: 6px;
    background-color: var(--es-primary);
    color: white;
    text-align: center;
    padding: 12px 16px;
    margin-left: 6px;
}
</style>
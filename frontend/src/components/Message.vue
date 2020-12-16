<template>
    <div class="message" :class="message.author =='BOT'? 'bot-message' : 'user-message'">
        <div v-if="message.text" class="text">
            {{message.text}}
        </div>
        <div v-if="message.suggestions && !suggestionChosen" class="suggestions"> 
            <ul> 
                <li v-for="(suggestion, index) in message.suggestions" :key="index" @click="chooseSuggestion(suggestion)">
                    {{suggestion}}
                </li>
            </ul>
        </div>
    </div>        

</template>
<script>
import bus from "../services/bus"
import api from "../services/api"
export default {
    data() {
        return {
            suggestionChosen: false
        }
    },
    props: {
        message: {
            type: Object
        }
    },
    methods: {
        chooseSuggestion: function(suggestion) {
            bus.$emit('new-user-message', suggestion);
            let response = api.sendMessage(suggestion);
            bus.$emit('response-received', response);
            this.suggestionChosen = true;
        }
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
.message .text {
    background-color: var(--es-grey-light);
    box-shadow: var(--es-box-shadow);
    border-radius: var(--es-box-radius);
    padding: var(--es-box-padding);
    display: inline-block;
    width: fit-content;
    margin-bottom: 14px;
}

.message.user-message .text{
    background-color: var(--es-primary);
    color: white;
    font-weight: 600;
}

.message.user-message .suggestions li{
    display: inline-block;
    font-size: 24px;
    padding: 8px 12px;
    background-color:  var(--es-primary-light);
    border-radius: 6px;
    margin-left: 20px;
    font-weight: 400;
}
</style>
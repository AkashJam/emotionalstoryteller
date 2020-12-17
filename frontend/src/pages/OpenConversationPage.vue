<template>
    <div class="conversation-page">
        <div class="banner container">
            <svg viewBox="0 0 500 500" >
                <path d="M0,50 C150,120 250,0 500,50 L500,00 L0,0 Z" style="stroke: none; fill:#d6efff;"></path>
            </svg>
            <img src="../assets/img/Berno_talking.svg">
        </div>
        <conversation></conversation>
        <input-message></input-message>
        <div style="position: absolute; top:400px; left:200px; background: white;">
            <button @submit.prevent="startConversation()" @click="startConversation()">Start talking</button>
            <button @submit.prevent="stopConversation()" @click="stopConversation()">Stop talking</button>
        </div>
    </div>

            

</template>
<script>
import Conversation from '../components/Conversation'
import InputMessage from '../components/InputMessage'
import recorder from '../services/audio'

export default {
    components: {
        Conversation,
        InputMessage
    },
    methods: {
        startConversation: function() {
            recorder.start()
        },
        stopConversation: function() {
            recorder.stop()
        }
    }

}
</script>


<style scoped>
svg {
  display: inline-block;
  position: absolute;
  left: 0;
}
.banner.container {
  position: fixed;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  height: 100px;
}

.banner img {
    position: absolute;
    z-index: 1;
    left: 10%;
    top: 16px;
    width: 12%;
}
</style>
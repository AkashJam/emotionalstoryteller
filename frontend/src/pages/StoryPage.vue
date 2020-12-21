<template>
    <div class="conversation-page">
        <story-cover :storyMode="context" :imgurl="imgurl"></story-cover>
        <conversation :context="context" :mode="'story'"></conversation>
        <input-message></input-message>
    </div>

            

</template>
<script>
import Conversation from '../components/Conversation'
import InputMessage from '../components/InputMessage'
import StoryCover from '../components/StoryCover'
// import recorder from '../services/audio'

export default {
    // data() {
    //     return {context: 'SCARY'}
    // }, 
    computed: {
        context: function() {
            return this.$store.state.context;
        },
        imgurl: function() {
            return this.$store.getters.getImgUrl
        }
    },
    components: {
        Conversation,
        InputMessage,
        StoryCover
    },
    methods: {
        // startConversation: function() {
        //     recorder.start()
        // },
        // stopConversation: function() {
        //     recorder.stop()
        // }
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
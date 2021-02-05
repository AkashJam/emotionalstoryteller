<template>
    <div class="conversation-page">
        <story-cover :storyMode="context" :imgurl="imgurl"></story-cover>
        <conversation :context="context"></conversation>
        <input-message></input-message>
    </div>

            

</template>
<script>
import Conversation from '../components/Conversation'
import InputMessage from '../components/InputMessage'
import StoryCover from '../components/StoryCover'
import api from '../services/api'

export default {
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
        setSessionID: async function() {
            await api.createSessionID();
        }
    },
    beforeMount() {
        this.setSessionID();
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
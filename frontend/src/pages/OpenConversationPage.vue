<template>
    <div class="conversation-page">
        <banner></banner>
        <conversation></conversation>
        <input-message></input-message>
        <!-- <div style="position: absolute; top:400px; left:200px; background: white;">
            <button @submit.prevent="startConversation()" @click="startConversation()">Start talking</button>
            <button @submit.prevent="stopConversation()" @click="stopConversation()">Stop talking</button>
        </div> -->
    </div>
</template>
<script>
import Conversation from '../components/Conversation'
import InputMessage from '../components/InputMessage'
import Banner from '../components/Banner'
// import recorder from '../services/audio'
// import bus from '../services/bus'

export default {
    components: {
        Conversation,
        InputMessage,
        Banner
    },
    computed: {
        contextChange: function() {

            return this.$store.state.context;
        }
    },
    methods: {
        // startConversation: function() {
        //     recorder.start()
        // },
        // stopConversation: function() {
        //     recorder.stop()
        // }
    },
    mounted() {
        // bus.$on('story-mode', (mode) => {
        //     console.log("start story in mode " + mode )
        //     this.$router.push({path: 'story'})
        // })
    },
    watch: {
        contextChange: function() {
            if( this.$store.state.context === 'SCARY-STORY') {
                this.$router.push({path: 'story'})
            }
        }
    }

}
</script>


<style scoped>

</style>
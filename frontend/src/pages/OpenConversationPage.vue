<template>
    <div class="conversation-page">
        <banner></banner>
        <conversation></conversation>
        <input-message></input-message>
    </div>
</template>
<script>
import Conversation from '../components/Conversation'
import InputMessage from '../components/InputMessage'
import Banner from '../components/Banner'
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
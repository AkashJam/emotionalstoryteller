<template>
  <div id="app">
    <open-conversation></open-conversation>
    <!-- <div style="height: 150px; overflow: hidden;" ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M0.00,49.98 C175.51,212.66 308.68,-45.88 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #08f;"></path></svg></div> -->
  </div>
</template>

<script>
import OpenConversation from './pages/OpenConversationPage.vue'

export default {
  name: 'App',
  components: {
    OpenConversation
  }
}
</script>

<style>
body {
  margin: 0;
}

#app, textarea{
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4c4c4c;
}

</style>

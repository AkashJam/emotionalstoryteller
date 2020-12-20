import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    messages: [{
                text: "Hello!",
                author: "BOT",
                type: 'MESSAGE'
            }],
    context: 'OPEN-CONV'
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message);
    },
    removeMessage (state, index) {
        // this.messages.splice(index, 1);
       state.messages.splice(index, 1);
    },
    setContext (state, context) {
        state.context = context;
    },
  },
  getters: {
    getMessages: state => {
      return state.messages;
    }
  }
})

export default store
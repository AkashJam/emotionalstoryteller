import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    messages: [{
                text: "Hello!",
                author: "BOT",
                type: 'MESSAGE'
            }]
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    },
    removeMessage (state, index) {
        // this.messages.splice(index, 1);
       state.messages.splice(index, 1)
    }
  },
  getters: {
    getMessages: state => {
      return state.messages;
    }
  }
})

export default store
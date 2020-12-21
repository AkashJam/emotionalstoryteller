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
    getImgUrl: (state) => {
        for(let i=state.messages.length - 1; i>=0; i--) {
            if(state.messages[i].author === 'BOT' && state.messages[i].imgurl) {
                return state.messages[i].imgurl
            }
        }
        return null;
    }
  }
})

export default store
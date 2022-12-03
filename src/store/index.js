import { createStore } from 'vuex';
import socket from '@/helpers/socket';


export default createStore({
  state: {
    messages: []
  },
  getters: {
    getMessages: state => state.messages
  },
  actions: {
    fetchMessages({commit}, data){
      socket.emit('message', data)
      commit('newMessages', data)
    }
  },
  mutations: {
    newMessages(state, payload){
      state.messages = state.messages.concat(payload)
    },
    setNewMessage(state, payload){
      state.messages = state.messages.concat(payload)
    }
  },
})

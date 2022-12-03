<template>
  <div v-if="!joined" class="parent-container">
    <div class="name-container">
      <input type="text" class="user-name" v-model="currentUser" />
      <button class="join-button" v-on:click="join">Join</button>
    </div>
  </div>
  <div v-if="joined">
    <div class="list-container">
      <div v-for="message in getMessages" :key="message.id">
        <b>
          {{ message.user }}
        </b>
        : {{ message.text }}
      </div>
    </div>
    <div class="text-input-container">
      <textarea
        v-model="text"
        class="text-message"
        @keyup.enter="sendMessage"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import socket from '../helpers/socket'

export default {
  data() {
    return {
      joined: false,
      currentUser: "",
      text: "",
    };
  },
  computed: mapGetters(['getMessages']),
  methods: {
    ...mapActions(['fetchMessages']),
    ...mapMutations(['setNewMessage']),
    join() {
      this.joined = true;
      socket.on(
        "message:received", (data) => {
          this.setNewMessage(data)
        }
      )
    },
    sendMessage() {
      this.addMessage();
      this.text = "";
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.currentUser,
      };
      this.fetchMessages(message)
    },
  },
  name: "ChatApp",
};
</script>

<style scoped>
.parent-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  padding-top: 150px;
}

.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.user-name {
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
}

.join-button {
  height: 30px;
  font-size: 20px;
}

.text-input-container {
  height: 100vh;
}

.text-message {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
}
</style>

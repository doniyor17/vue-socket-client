import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import socket from './helpers/socket'

createApp(App).use(store).use(socket).mount('#app')

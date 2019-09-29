import Vue from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
new Vue({
    el:"#app",
    router,
    render:h=>h(App)
})
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue')
    },
    {
      path: '/list',
      component: () => import('../views/list.vue')
    },
    {
      path: '/detail',
      component: () => import('../views/detail.vue')
    }
  ]
})

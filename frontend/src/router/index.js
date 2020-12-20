import Vue from 'vue'
import VueRouter from 'vue-router'
import OpenConversationPage from '../pages/OpenConversationPage'
import StoryPage from '../pages/StoryPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Conversation',
    component: OpenConversationPage
  },
  {
    path: '/story',
    name: 'Story',
    component: StoryPage
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

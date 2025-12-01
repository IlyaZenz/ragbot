import ChatView from '@/pages/ChatView.vue'
import Login from '@/pages/Auth.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ChatView',
      component: ChatView,
    },
     {
      path: '/login',
      name: 'Login',
      component: Login,
       meta: { hideAside: true }
    },
  ],
})

export default router

import ChatView from '@/pages/ChatView.vue'
import Login from '@/pages/RegPage.vue'
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
      path: '/registration',
      name: 'registration',
      component: Login,
      meta: { hideAside: true },
    },
  ],
})

export default router

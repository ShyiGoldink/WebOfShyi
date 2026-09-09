import { createRouter, createWebHistory } from 'vue-router'
import PersonalBlog from '../views/personal_blog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: PersonalBlog,
    },
  ],
})

export default router
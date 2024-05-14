import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home_en', component: () => import('../views/Home.vue') },
    { path: '/portfolio', name: 'portfolio_en', component: () => import('../views/Portfolio.vue') },
    { path: '/contact', name: 'contact_en', component: () => import('../views/Contact.vue') },
    { path: '/portfolio/:id', name: 'project_en', component: () => import('../views/Project.vue'), props: true },
    {
      path: '/nl',
      children: [
        { path: '', name: 'home_nl', component: () => import('../views/Home.vue') },
        { path: 'portfolio', name: 'portfolio_nl', component: () => import('../views/Portfolio.vue') },
        { path: 'contact', name: 'contact_nl', component: () => import('../views/Contact.vue') },
        { path: 'portfolio/:id', name: 'project_nl', component: () => import('../views/Project.vue'), props: true }
      ]
    },
    {
      path: '/admin',
      children: [
        { path: '', name: 'admin', component: () => import('../views/admin/AdminHome.vue') },
        { path: 'users', name: 'admin_users', component: () => import('../views/admin/AdminUsers.vue') }
      ]
    },
    { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/404.vue') },
  ]
})

router.beforeEach((to, _, next) => {
  const language = to.fullPath.startsWith('/nl') ? 'nl' : 'en'
  i18n.global.locale.value = language
  next()
})

export default router
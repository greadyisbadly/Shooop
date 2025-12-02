import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
  { path: '/goods/:id', component: () => import('./pages/GoodsDetail.vue') },
  { path: '/login', component: () => import('./pages/Login.vue') },
  { path: '/register', component: () => import('./pages/Register.vue') },
  { path: '/cart', component: () => import('./pages/Cart.vue') },
  { path: '/user', component: () => import('./pages/User.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
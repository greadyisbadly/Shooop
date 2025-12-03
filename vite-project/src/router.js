// 说明：每一个 route 对象都包含 path（路径）和 component（组件）。
// 使用 createWebHistory() 启用 HTML5 的 history 模式（去掉 #）。

import { createRouter, createWebHistory } from 'vue-router'

// 路由表：把路径映射到页面组件
const routes = [
  // 首页（商品列表）
  { path: '/', component: () => import('./pages/Home.vue') },
  // 商品详情：动态路由，:id 是占位符，可被任意商品 id 替换
  { path: '/goods/:id', component: () => import('./pages/GoodsDetail.vue') },
  // 登录与注册页面
  { path: '/login', component: () => import('./pages/Login.vue') },
  { path: '/register', component: () => import('./pages/Register.vue') },
  // 购物车与用户页
  { path: '/cart', component: () => import('./pages/Cart.vue') },
  { path: '/user', component: () => import('./pages/User.vue') }
]

// 创建 router 实例并导出
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
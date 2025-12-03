// 说明：此文件负责创建 Vue 应用实例，安装全局插件（Pinia、路由、Element Plus），
// 并在应用启动时做一些简单的初始化（例如把已登录用户名同步到购物车显示）。

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router' // 路由配置
import App from './App.vue' // 根组件

// 创建 Vue 应用实例
const app = createApp(App)

// 1) 创建 Pinia（状态管理）并安装到 Vue
const pinia = createPinia()
app.use(pinia)

// 2) 安装路由（vue-router）
app.use(router)

// 3) 安装 Element Plus（UI 组件库）
app.use(ElementPlus)

// 4) 启动时的一次性初始化：如果用户已登录，把用户名显示在购物车/导航中
//    这里我们用 try/catch 来防止在极端情况下（例如 store 初始化顺序）抛出错误。
try {
	// 由于我们在这个文件中无法直接 import 并调用 useXxxStore()（需要在 pinia 已被安装后），
	// 我们先从 pinia 实例创建 store 的引用，再做简单的同步。
	const { useAuthStore, useCartStore } = await import('./pinia')
	const authStore = useAuthStore(pinia)
	const cartStore = useCartStore(pinia)
	if (authStore && authStore.user && cartStore) {
		// 把已登录用户名赋给购物车显示用的 userInfo.name
		cartStore.userInfo = { ...cartStore.userInfo, name: authStore.user.name }
	}
} catch (e) {
	// 如果出错（通常不会），我们忽略并继续启动应用
}

// 挂载应用到页面上的 #app 元素
app.mount('#app')
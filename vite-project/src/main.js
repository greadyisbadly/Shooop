import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import { useAuthStore, useCartStore } from './pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 启动时同步已登录用户到购物车显示信息（如果存在）
try {
	const auth = useAuthStore(pinia)
	const cart = useCartStore(pinia)
	if (auth && auth.user && cart) {
		cart.userInfo = { ...cart.userInfo, name: auth.user.name }
	}
} catch (e) {
	// ignore
}

app.mount('#app')
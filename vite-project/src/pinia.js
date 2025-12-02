import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // 购物车商品列表：[{ id, name, price, image, count }]
    userInfo: { name: '游客', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
  }),
  actions: {
    // 添加商品到购物车
    addGoods(goods) {
      const existItem = this.items.find(item => item.id === goods.id)
      if (existItem) {
        existItem.count++
      } else {
        this.items.push({ ...goods, count: 1 })
      }
    },
    // 修改商品数量
    updateCount(id, count) {
      const item = this.items.find(item => item.id === id)
      if (item) item.count = count
    },
    // 删除商品
    removeGoods(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    // 清空购物车
    clearCart() {
      this.items = []
    }
  },
  getters: {
    // 计算总价
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
    }
  }
})

export const useAuthStore = defineStore('auth', {
  // 这是一个极简的内存型认证 store：
  // - 不做持久化（不使用 localStorage）
  // - 注册/登录直接设置 user，任何账号密码均可登录
  // - 适用于演示或无后端场景
  state: () => ({
    user: null
  }),
  actions: {
    // 注册：直接把用户名设置为已登录用户（不保存密码）
    register({ name /*, password */ }) {
      this.user = { name }
    },
    // 登录：不校验，直接设为已登录用户
    login({ name /*, password */ }) {
      this.user = { name }
    },
    logout() {
      this.user = null
    }
  },
  getters: {
    isLogged: (state) => !!state.user
  }
})
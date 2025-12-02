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
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth_user') || 'null')
  }),
  actions: {
    register({ name, password }) {
      const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
      if (users.find(u => u.name === name)) {
        throw new Error('用户已存在')
      }
      users.push({ name, password })
      localStorage.setItem('mock_users', JSON.stringify(users))
      this.user = { name }
      localStorage.setItem('auth_user', JSON.stringify(this.user))
    },
    login({ name, password }) {
      const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
      const u = users.find(u => u.name === name && u.password === password)
      if (!u) {
        throw new Error('用户名或密码错误')
      }
      this.user = { name }
      localStorage.setItem('auth_user', JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('auth_user')
    }
  },
  getters: {
    isLogged: (state) => !!state.user
  }
})
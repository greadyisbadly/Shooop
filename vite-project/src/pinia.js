// 这个文件导出两个 store：购物车 store（cart）和认证 store（auth）。
// - cart 用于保存购物车商品和显示的用户信息
// - auth 用于维护当前登录用户

import { defineStore } from 'pinia'

// ----- 购物车 store -----
export const useCartStore = defineStore('cart', {
  // state 定义数据结构并返回初始值
  state: () => ({
    // items 中保存购物车的商品对象，格式为 { id, name, price, image, count }
    items: [],
    // userInfo 用于在页面上显示当前用户的信息
    userInfo: {
      name: '游客',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  }),

  // actions 放置可以修改 state 的方法（类似组件中的 methods）
  actions: {
    // 添加商品到购物车：如果已存在则增加数量，否则插入新项
    addGoods(goods) {
      const existItem = this.items.find(item => item.id === goods.id)
      if (existItem) {
        existItem.count++
      } else {
        // 把商品对象复制一份并增加 count 字段
        this.items.push({ ...goods, count: 1 })
      }
    },

    // 修改指定商品的数量
    updateCount(id, count) {
      const item = this.items.find(item => item.id === id)
      if (item) item.count = count
    },

    // 删除指定商品
    removeGoods(id) {
      this.items = this.items.filter(item => item.id !== id)
    },

    // 清空购物车
    clearCart() {
      this.items = []
    }
  },

  // getters 可以看作计算属性，用于从 state 派生值
  getters: {
    // 计算购物车总价（保留两位小数）
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
    }
  }
})


export const useAuthStore = defineStore('auth', {
  // state: 保存当前登录用户信息
  state: () => ({
    // user 为 null 表示未登录，若登录则为 { name }
    user: null
  }),

  actions: {
    // register: 简单注册实现，将用户名写入 user（不保存密码）
    register({ name }) {
      this.user = { name }
    },

    // login: 简单登录实现，不做校验，直接设置 user
    login({ name }) {
      this.user = { name }
    },

    // logout: 清空登录状态
    logout() {
      this.user = null
    }
  },

  // getters: 判断是否已登录
  getters: {
    isLogged: (state) => !!state.user
  }
})
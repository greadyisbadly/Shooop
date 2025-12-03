<template>
  <div class="user">
    <Navbar />
    <el-main>
      <div class="user-container">
        <el-card>
          <!-- 用户信息 -->
          <div class="user-info">
            <el-avatar :src="cartStore.userInfo.avatar" size="large" />
            <div class="user-name">{{ cartStore.userInfo.name }}</div>
          </div>

          <!-- 功能列表 -->
          <el-menu style="margin-top: 20px;">
            <el-menu-item>
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><ShoppingTrolley /></el-icon>
              <span>我的订单</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
            <el-menu-item @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>
              <span>退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script setup>
// 功能：显示用户信息、提供一些操作入口（示意），并支持退出登录

import { useRouter } from 'vue-router'
import { useCartStore, useAuthStore } from '../pinia'
import Navbar from '../components/Navbar.vue'
import { User, ShoppingTrolley, Setting, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 获取路由与 store 实例
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// 退出登录：调用 authStore.logout() 清理登录状态，提示用户并返回首页
const handleLogout = () => {
  // 清空认证状态
  authStore.logout()
  // 可选：恢复购物车显示的用户名为游客（如果需要）
  try {
    cartStore.userInfo = { ...cartStore.userInfo, name: '游客' }
  } catch (e) {
    // 忽略错误（防止没有 cartStore 的极端情况）
  }
  ElMessage.success('退出成功')
  router.push('/')
}
</script>

<style scoped>
.user { min-height: 100vh; }
.user-container { max-width: 600px; margin: 0 auto; padding: 20px; }
.user-info { display: flex; align-items: center; padding: 20px 0; border-bottom: 1px solid #eee; }
.user-name { font-size: 18px; margin-left: 20px; font-weight: bold; }
</style>
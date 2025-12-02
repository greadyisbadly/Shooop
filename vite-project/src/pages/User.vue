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
import { useRouter } from 'vue-router'
import { useCartStore } from '../pinia'
import Navbar from '../components/Navbar.vue'
import { User, ShoppingTrolley, Setting, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()

// 退出登录（模拟）
const handleLogout = () => {
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
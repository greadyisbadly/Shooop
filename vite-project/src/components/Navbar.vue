<template>
  <el-header style="background-color: #fff; border-bottom: 1px solid #eee;">
    <el-container>
      <el-menu mode="horizontal" :default-active="activePath" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/cart">
          购物车
          <el-badge :value="cartStore.items.length" class="ml-2" />
        </el-menu-item>
        <el-menu-item index="/user">个人中心</el-menu-item>
      </el-menu>
    </el-container>
  </el-header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../pinia'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// 当前激活的路由
const activePath = computed(() => route.path)

// 路由跳转
const handleSelect = (path) => {
  router.push(path)
}
</script>

<style scoped>
.el-header { padding: 0; }
.el-container { max-width: 1200px; margin: 0 auto; }
</style>
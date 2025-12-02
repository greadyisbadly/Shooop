<template>
  <div class="home">
    <Navbar />
    <el-main>
      <div class="goods-list">
        <GoodsCart v-for="goods in goodsList" :key="goods.id" :goods="goods" />
      </div>
    </el-main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import GoodsCart from '../components/GoodsCart.vue'
import { ref } from 'vue'

// 模拟商品数据
const goodsList = ref([
  { id: 1, name: '纯棉短袖T恤', price: 99, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 2, name: '宽松牛仔裤', price: 199, image: 'https://img2.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 3, name: '休闲运动鞋', price: 299, image: 'https://img0.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 4, name: '连帽卫衣', price: 159, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }
])
</script>

<style scoped>
.home { min-height: 100vh; }
.goods-list { display: flex; flex-wrap: wrap; justify-content: center; padding: 20px 0; }
</style>
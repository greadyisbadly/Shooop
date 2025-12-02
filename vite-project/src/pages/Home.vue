<template>
  <div class="home">
    <Navbar />
    <el-main>
      <div class="goods-list">
        <GoodsCart v-for="goods in pagedGoods" :key="goods.id" :goods="goods" />
      </div>

      <Pager :currentPage="currentPage" :totalPages="totalPages" @changePage="(p) => currentPage = p" />
    </el-main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import GoodsCart from '../components/GoodsCart.vue'
import { ref, computed } from 'vue'
import Pager from '../components/Pager.vue'

// 模拟商品数据
const goodsList = ref([
  { id: 1, name: '纯棉短袖T恤', price: 99, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 2, name: '宽松牛仔裤', price: 199, image: 'https://img2.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 3, name: '休闲运动鞋', price: 299, image: 'https://img0.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 4, name: '连帽卫衣', price: 159, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 5, name: '休闲短裤', price: 89, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 6, name: '雪地靴', price: 349, image: 'https://img0.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 7, name: '针织毛衣', price: 179, image: 'https://img2.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 8, name: '运动长裤', price: 129, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 9, name: '休闲帽子', price: 49, image: 'https://img0.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { id: 10, name: '真皮手套', price: 69, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }
])

// 分页相关
const perPage = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(goodsList.value.length / perPage)))
const pagedGoods = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return goodsList.value.slice(start, start + perPage)
})
</script>

<style scoped>
.home { min-height: 100vh; }
.goods-list { display: flex; flex-wrap: wrap; justify-content: center; padding: 20px 0; }
</style>
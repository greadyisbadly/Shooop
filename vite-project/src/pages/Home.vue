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
// 为初学者重写：此脚本部分逐步注释并使用更直观的变量名
import Navbar from '../components/Navbar.vue'
import GoodsCart from '../components/GoodsCart.vue'
import { ref, computed } from 'vue'
import Pager from '../components/Pager.vue'

// 1. 模拟一些商品数据（实际项目中这些数据通常从后端 API 获取）
// 我们把每个商品作为一个对象放进数组：id、name、price、image
const goodsList = ref([
  { id: 1, name: '纯棉短袖T恤', price: 99,  image: new URL('./picture/6655931273082.jpg', import.meta.url).href},
  { id: 2, name: '宽松牛仔裤', price: 199, image: new URL('./picture/63f9a03e2a6fb222.jpg', import.meta.url).href},
  { id: 3, name: '休闲运动鞋', price: 299, image: new URL('./picture/下载.webp', import.meta.url).href},
  { id: 4, name: '连帽卫衣', price: 159, image: new URL('./picture/连帽卫衣.webp', import.meta.url).href},
  { id: 5, name: '休闲短裤', price: 89, image: new URL('./picture/休闲短裤.webp', import.meta.url).href},
  { id: 6, name: '雪地靴', price: 349, image: new URL('./picture/雪地靴.webp', import.meta.url).href},
  { id: 7, name: '针织毛衣', price: 179, image: new URL('./picture/针织毛衣.webp', import.meta.url).href},
  { id: 8, name: '运动长裤', price: 129, image: new URL('./picture/运动长裤.webp', import.meta.url).href},
  { id: 9, name: '休闲帽子', price: 49, image: new URL('./picture/休闲帽子.webp', import.meta.url).href},
  { id: 10, name: '真皮手套', price: 69, image: new URL('./picture/真皮手套.webp', import.meta.url).href }
])

// 2. 分页设置：每页显示 5 条
const perPage = 5 // 每页数量
const currentPage = ref(1) // 当前页码（从 1 开始）

// 计算总页数：向上取整，至少为 1
const totalPages = computed(() => Math.max(1, Math.ceil(goodsList.value.length / perPage)))

// 计算当前页需要显示的商品：使用 slice 取子数组
const pagedGoods = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage
  return goodsList.value.slice(startIndex, startIndex + perPage)
})
</script>

<style scoped>
.home { min-height: 100vh; }
.goods-list { display: flex; flex-wrap: wrap; justify-content: center; padding: 20px 0; }
</style>
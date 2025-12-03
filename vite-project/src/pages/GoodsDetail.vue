<template>
  <div class="detail">
    <Navbar />
    <el-main>
      <el-row :gutter="20" style="margin-top: 20px;">
        <!-- 商品图片 -->
        <el-col :span="8">
          <img :src="goods.image" alt="商品图片" style="width: 100%; height: 400px; object-fit: cover;" />
        </el-col>
        <!-- 商品信息 -->
        <el-col :span="16">
          <h2>{{ goods.name }}</h2>
          <p class="price">¥{{ goods.price }}</p>
          <p class="desc">{{ goods.desc }}</p>
          <el-button type="primary" size="large" @click="handleAdd">加入购物车</el-button>
          <el-button size="large" @click="router.push('/')">返回首页</el-button>
        </el-col>
      </el-row>
    </el-main>
    <!-- 评论区 -->
    <Comments :productId="goods.id" />
  </div>
</template>

<script setup>
// 功能说明：
// 1. 根据路由参数中的商品 id 找到对应的商品并显示详情。
// 2. 支持“加入购物车”和“返回首页”操作。
// 3. 页面下方嵌入评论组件（Comments）

import { useRoute, useRouter } from 'vue-router' // 路由相关的工具
import { useCartStore } from '../pinia' // 购物车 store（Pinia）
import { ref, onMounted } from 'vue' // Vue 的响应式与生命周期 API
import Navbar from '../components/Navbar.vue' // 导航栏组件
import { ElMessage } from 'element-plus' // Element Plus 弹出消息
import Comments from '../components/Comments.vue' // 评论组件
import { id } from 'element-plus/es/locale/index.mjs'

// 通过 useRoute() 获取当前路由对象，用来读取路由参数（如 :id）
const route = useRoute()
// useRouter 用于编程式导航（例如返回首页）
const router = useRouter()

// 获取购物车 store 的实例，以便调用 addGoods 等方法
const cartStore = useCartStore()

// goods 用于在模板中展示当前商品的信息（响应式）
const goods = ref({})

// 这里模拟商品数据（在真实项目中通常从后端 API 拉取）
// 每个商品包含 id、name、price、image、desc 等字段
const goodsData = [
  {
    id: 1,
    name: '纯棉短袖T恤',
    price: 99,
    image: new URL('./picture/纯棉短袖T恤.webp', import.meta.url).href,
    desc: '100%纯棉材质，透气舒适，多色可选，夏季必备！'
  },
  {
    id: 2,
    name: '宽松牛仔裤',
    price: 199,
    image: new URL('./picture/宽松牛仔裤.webp', import.meta.url).href,
    desc: '宽松版型，显瘦百搭，弹力牛仔面料，耐磨耐穿！'
  },
  {
    id: 3,
    name: '休闲运动鞋',
    price: 299,
    image: new URL('./picture/休闲运动鞋.webp', import.meta.url).href,
    desc: '轻便缓震，防滑鞋底，透气网面，日常休闲首选！'
  },
  {
    id: 4,
    name: '连帽卫衣',
    price: 159,
    image: new URL('./picture/连帽卫衣.webp', import.meta.url).href,
    desc: '加绒加厚，保暖舒适，宽松设计，秋冬必备单品！'
  },
  {
    id:5,
    name: '休闲短裤', 
    price: 89,
    image: new URL('./picture/休闲短裤.webp', import.meta.url).href,
    desc: '轻便透气，舒适休闲，夏季必备短裤！'
  },
  {
    id:6,
    name: '雪地靴', 
    price: 349,
    image: new URL('./picture/雪地靴.webp', import.meta.url).href,
    desc: '防水保暖，防滑耐磨，冬季出行必备！'
  },
  {
    id:7,
    name: '针织毛衣',
    price: 129,
    image: new URL('./picture/针织毛衣.webp', import.meta.url).href,
    desc: '柔软舒适，保暖时尚，秋冬必备单品！'
  },
  {
    id:8,
    name: '运动长裤', 
    price: 129,
    image: new URL('./picture/运动长裤.webp', import.meta.url).href,
    desc: '透气舒适，弹力十足，运动休闲两相宜！'
  },
  {
    id:9,
    name: '休闲帽子', 
    price: 49,
    image: new URL('./picture/休闲帽子.webp', import.meta.url).href,
    desc: '时尚百搭，遮阳防晒，户外出行必备！'
  },
  {
    id:10,
    name: '真皮手套', 
    price: 69,
    image: new URL('./picture/真皮手套.webp', import.meta.url).href,
    desc: '柔软舒适，保暖耐用，冬季出行好伴侣！'
  }
]

onMounted(() => {
  // 从路由参数读取 id（字符串），转换为数字
  const id = parseInt(route.params.id)
  // 在模拟数据中查找对应商品；若找不到则赋空对象
  goods.value = goodsData.find(item => item.id === id) || {}
})

// 点击“加入购物车”调用的函数
// 作用：把当前商品加入购物车，并提示用户
const handleAdd = () => {
  // cartStore.addGoods 会处理数量累加等逻辑
  cartStore.addGoods(goods.value)
  ElMessage.success('加入购物车成功！')
}
</script>

<style scoped>
.detail { min-height: 100vh; }
.price { color: #e63946; font-size: 24px; font-weight: bold; margin: 20px 0; }
.desc { font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #666; }
</style>
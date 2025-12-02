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
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../pinia'
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import { ElMessage } from 'element-plus'
import Comments from '../components/Comments.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const goods = ref({})

// 模拟商品详情数据
const goodsData = [
  { id: 1, name: '纯棉短袖T恤', price: 99, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', desc: '100%纯棉材质，透气舒适，多色可选，夏季必备！' },
  { id: 2, name: '宽松牛仔裤', price: 199, image: 'https://img2.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', desc: '宽松版型，显瘦百搭，弹力牛仔面料，耐磨耐穿！' },
  { id: 3, name: '休闲运动鞋', price: 299, image: 'https://img0.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', desc: '轻便缓震，防滑鞋底，透气网面，日常休闲首选！' },
  { id: 4, name: '连帽卫衣', price: 159, image: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', desc: '加绒加厚，保暖舒适，宽松设计，秋冬必备单品！' }
]

onMounted(() => {
  // 根据路由参数获取商品详情
  const id = parseInt(route.params.id)
  goods.value = goodsData.find(item => item.id === id) || {}
})

// 加入购物车
const handleAdd = () => {
  cartStore.addGoods(goods.value)
  ElMessage.success('加入购物车成功！')
}
</script>

<style scoped>
.detail { min-height: 100vh; }
.price { color: #e63946; font-size: 24px; font-weight: bold; margin: 20px 0; }
.desc { font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #666; }
</style>
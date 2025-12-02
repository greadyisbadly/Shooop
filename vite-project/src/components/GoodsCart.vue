<template>
  <el-card class="goods-card" shadow="hover">
    <img :src="goods.image" alt="商品图片" class="goods-img" />
    <div class="goods-info">
      <h3>{{ goods.name }}</h3>
      <p class="price">¥{{ goods.price }}</p>
      <el-button type="primary" size="small" @click="handleAdd">加入购物车</el-button>
      <el-button size="small" @click="toDetail">查看详情</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../pinia'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()
const props = defineProps({
  goods: {
    type: Object,
    required: true
  }
})

// 加入购物车
const handleAdd = () => {
  cartStore.addGoods(props.goods)
  ElMessage.success('加入购物车成功！')
}

// 跳转到详情页
const toDetail = () => {
  router.push(`/goods/${props.goods.id}`)
}
</script>

<style scoped>
.goods-card { width: 240px; margin: 10px; }
.goods-img { width: 100%; height: 200px; object-fit: cover; }
.goods-info { padding: 10px 0; }
.price { color: #e63946; font-weight: bold; margin: 10px 0; }
.el-button { margin-right: 5px; }
</style>
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
// 作用：显示单个商品卡片，并实现“加入购物车”和“查看详情”按钮功能
import { useRouter } from 'vue-router'
import { useCartStore } from '../pinia'
import { ElMessage } from 'element-plus'

// 1. 获取路由和购物车 store（Pinia）实例
const router = useRouter()
const cartStore = useCartStore()

// 2. 接收父组件传入的 props（这里是商品对象）
const props = defineProps({
  goods: {
    type: Object,
    required: true
  }
})

// 3. 点击“加入购物车”按钮时执行：
//    - 调用 cartStore.addGoods 将商品加入购物车
//    - 使用 Element Plus 的提示组件显示成功信息
const handleAdd = () => {
  cartStore.addGoods(props.goods)
  ElMessage.success('加入购物车成功！')
}

// 4. 点击“查看详情”按钮时执行：
//    - 使用 router.push 编程式导航到详情页，路径为 /goods/:id
const toDetail = () => {
  // 注意：props.goods.id 必须存在且唯一
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
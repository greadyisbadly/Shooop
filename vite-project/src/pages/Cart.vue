<template>
  <div class="cart">
    <Navbar />
    <el-main>
      <div class="cart-container">
        <h2>我的购物车</h2>
        <el-table :data="cartStore.items" border style="width: 100%; margin-top: 20px;">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="price" label="单价" />
          <el-table-column label="数量">
            <template #default="scope">
              <el-input-number v-model="scope.row.count" :min="1" @change="handleCountChange(scope.row.id, scope.row.count)" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="cart-footer" v-if="cartStore.items.length">
          <p>总价：<span class="total">¥{{ cartStore.totalPrice }}</span></p>
          <el-button type="primary">结算</el-button>
          <el-button @click="cartStore.clearCart">清空购物车</el-button>
        </div>

        <div class="empty-cart" v-else>
          <el-empty description="购物车为空" />
          <el-button type="primary" @click="router.push('/')">去首页逛逛</el-button>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../pinia'
import Navbar from '../components/Navbar.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()

// 修改数量
const handleCountChange = (id, count) => {
  cartStore.updateCount(id, count)
}

// 删除商品
const handleDelete = (id) => {
  cartStore.removeGoods(id)
  ElMessage.info('商品已删除')
}
</script>

<style scoped>
.cart { min-height: 100vh; }
.cart-container { max-width: 1000px; margin: 0 auto; padding: 20px; }
.cart-footer { margin-top: 20px; text-align: right; }
.total { color: #e63946; font-size: 18px; font-weight: bold; }
.empty-cart { text-align: center; margin-top: 50px; }
</style>
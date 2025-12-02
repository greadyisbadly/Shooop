<template>
  <div class="auth-page">
    <Navbar />
    <el-main>
      <el-card class="auth-card">
        <h2>注册</h2>
        <el-form :model="form" class="auth-form" @submit.native.prevent>
          <el-form-item label="用户名">
            <el-input v-model="form.name" autocomplete="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirm" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister">注册</el-button>
            <router-link to="/login"><el-button type="text">去登录</el-button></router-link>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../pinia'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ name: '', password: '', confirm: '' })

const handleRegister = () => {
  if (!form.name || !form.password) {
    ElMessage.error('请填写用户名和密码')
    return
  }
  if (form.password !== form.confirm) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  try {
    auth.register({ name: form.name, password: form.password })
    ElMessage.success('注册成功，已登录')
    router.push('/user')
  } catch (e) {
    ElMessage.error(e.message || '注册失败')
  }
}
</script>

<style scoped>
.auth-card { width: 480px; margin: 40px auto; padding: 20px; }
.auth-form { padding-top: 10px; }
.auth-card h2 { text-align: center; margin: 0 0 16px; }
.auth-card .el-input__inner { height: 40px; padding: 8px 12px; }
</style>

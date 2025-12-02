<template>
  <div>
    <el-header style="background-color: #fff; border-bottom: 1px solid #eee;">
      <el-container style="display:flex;align-items:center;justify-content:space-between;">
        <el-menu mode="horizontal" :default-active="activePath" @select="handleSelect" class="left-menu">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/cart">
            购物车
            <el-badge :value="cartStore.items.length" class="ml-2" />
          </el-menu-item>
          <el-menu-item index="/user">个人中心</el-menu-item>
        </el-menu>

        <div class="right-area">
          <template v-if="authStore.isLogged">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar :size="32" style="margin-right:8px">{{ authStore.user.name.charAt(0) }}</el-avatar>
                {{ authStore.user.name }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goToUser">个人中心</el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button type="primary" size="small" @click="showAuthDialog = true">登录 / 注册</el-button>
          </template>
        </div>
      </el-container>
    </el-header>

    <el-dialog v-model:visible="showAuthDialog" title="用户验证" width="380px">
      <div style="display:flex;gap:12px;margin-bottom:12px;">
        <el-button :type="authMode==='login'? 'primary' : 'default'" @click="authMode='login'">登录</el-button>
        <el-button :type="authMode==='register'? 'primary' : 'default'" @click="authMode='register'">注册</el-button>
      </div>
      <el-form label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAuthDialog=false">取消</el-button>
        <el-button type="primary" @click="submitAuth">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useCartStore, useAuthStore } from '../pinia'
import { computed } from 'vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// 当前激活的路由
const activePath = computed(() => route.path)

// 路由跳转
const handleSelect = (path) => {
  router.push(path)
}

const showAuthDialog = ref(false)
const authMode = ref('login') // 'login' or 'register'
const form = reactive({ name: '', password: '' })

const submitAuth = async () => {
  try {
    if (authMode.value === 'login') {
      await authStore.login({ name: form.name, password: form.password })
      ElMessage.success('登录成功')
    } else {
      await authStore.register({ name: form.name, password: form.password })
      ElMessage.success('注册并登录成功')
    }
    showAuthDialog.value = false
    form.name = ''
    form.password = ''
  } catch (e) {
    ElMessage.error(e.message || '操作失败')
  }
}

const handleLogout = () => {
  authStore.logout()
  ElMessage.success('已退出登录')
}

const goToUser = () => {
  router.push('/user')
}
</script>

<template>
  <el-dialog v-model:visible="showAuthDialog" title="用户验证" width="380px">
    <div style="display:flex;gap:12px;margin-bottom:12px;">
      <el-button :type="authMode==='login'? 'primary' : 'default'" @click="authMode='login'">登录</el-button>
      <el-button :type="authMode==='register'? 'primary' : 'default'" @click="authMode='register'">注册</el-button>
    </div>
    <el-form label-position="top">
      <el-form-item label="用户名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showAuthDialog=false">取消</el-button>
      <el-button type="primary" @click="submitAuth">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-header { padding: 0; }
.el-container { max-width: 1200px; margin: 0 auto; }
</style>
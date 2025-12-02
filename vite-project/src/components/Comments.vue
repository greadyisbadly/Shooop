<template>
  <el-card class="comments-card" shadow="never">
    <div class="comments-header">
      <h3>评论区</h3>
      <div class="meta">实时评论（页面刷新后会清空）</div>
    </div>

    <div class="comment-input">
      <el-input
        type="textarea"
        v-model="text"
        placeholder="写下你的评论..."
        :rows="3"
      />
      <div class="actions">
        <el-button size="small" @click="clear" type="default">清空</el-button>
        <el-button size="small" type="primary" @click="submit">发表</el-button>
      </div>
    </div>

    <el-divider />

    <div v-if="comments.length === 0" class="no-comments">还没有评论，发挥你的创作吧～</div>

    <div class="comments-list">
      <div v-for="c in comments" :key="c.id" class="comment-item">
        <div class="left">
          <el-avatar :size="36">{{ c.author.charAt(0) }}</el-avatar>
        </div>
        <div class="right">
          <div class="row">
            <div class="author">{{ c.author }}</div>
            <div class="time">{{ c.time }}</div>
          </div>
          <div class="content">{{ c.content }}</div>
          <div class="row footer">
            <div></div>
            <div>
              <el-button type="text" size="small" @click="remove(c.id)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../pinia'

const props = defineProps({ productId: { type: [String, Number], required: false } })

// 内存中保存当前页面会话的评论（不持久化）
const comments = ref([])
const text = ref('')

const auth = useAuthStore()

const nowTime = () => {
  const d = new Date()
  const pad = (n) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const submit = () => {
  const content = text.value.trim()
  if (!content) {
    // 用浏览器提示（简单）
    window.alert('请输入评论内容')
    return
  }
  const author = auth && auth.user && auth.user.name ? auth.user.name : '游客'
  const id = Date.now() + Math.random().toString(16).slice(2,6)
  comments.value.unshift({ id, author, content, time: nowTime(), productId: props.productId })
  text.value = ''
}

const clear = () => { text.value = '' }

const remove = (id) => {
  const idx = comments.value.findIndex(c => c.id === id)
  if (idx !== -1) comments.value.splice(idx, 1)
}

// 可按需暴露（外部组件无需访问）
</script>

<style scoped>
.comments-card { margin-top: 20px; }
.comments-header { display:flex; justify-content:space-between; align-items:center; }
.comments-header h3 { margin:0; font-size:18px }
.comments-header .meta { color: #888; font-size:12px }
.comment-input { margin-top:12px }
.actions { display:flex; gap:8px; justify-content:flex-end; margin-top:8px }
.no-comments { padding: 20px 0; color:#666; text-align:center }
.comments-list { margin-top:8px }
.comment-item { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid #f0f0f0 }
.comment-item .left { width:44px; }
.comment-item .right { flex:1 }
.comment-item .row { display:flex; justify-content:space-between; align-items:center }
.comment-item .author { font-weight:600 }
.comment-item .time { color:#999; font-size:12px }
.comment-item .content { margin:8px 0; color:#333 }
.comment-item .footer { margin-top:4px }
</style>

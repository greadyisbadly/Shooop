<template>
  <div class="pager">
    <el-button size="small" :disabled="currentPage<=1" @click="prev">上一页</el-button>
    <span class="info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
    <el-button size="small" :disabled="currentPage>=totalPages" @click="next">下一页</el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})
const emit = defineEmits(['changePage'])

const prev = () => {
  if (props.currentPage > 1) emit('changePage', props.currentPage - 1)
}
const next = () => {
  if (props.currentPage < props.totalPages) emit('changePage', props.currentPage + 1)
}
</script>

<style scoped>
.pager { display:flex; align-items:center; gap:12px; justify-content:center; padding:12px 0 }
.pager .info { color:#666 }
</style>

<!-- 分页操作 -->
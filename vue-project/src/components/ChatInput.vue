<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['send'])

const text = ref('')

const send = () => {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<template>
  <div class="chat-input">
    <el-input v-model="text" placeholder="Введите сообщение..." @keyup.enter="send" clearable />
    <el-button type="primary" @click="send">
      Отправить
    </el-button>
  </div>
</template>

<style scoped>
.chat-input {
  display: flex;
  gap: 12px;
  padding: 12px 0px;
  border-top: 1px solid #e4e7ed;
  background: white;
}
</style>

<script setup lang="ts">
import { type PropType } from 'vue'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
}

defineProps({
  messages: {
    type: Array as PropType<Message[]>,
    required: true
  }
})
</script>

<template>
  <div class="chat-window">
    <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
      {{ msg.text }}
    </div>
  </div>
</template>

<style scoped>
.chat-window {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f5f7fa;
}

.message {
  max-width: 70%;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 10px;
}

.message.user {
  margin-left: auto;
  background: var(--el-color-primary);
  color: white;
}

.message.bot {
  background: white;
  border: 1px solid #e4e7ed;
}
</style>

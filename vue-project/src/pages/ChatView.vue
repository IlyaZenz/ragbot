<script setup lang="ts">
import { ref } from 'vue'
import ChatWindow from '@/components/ChatWindow.vue'
import ChatInput from '@/components/ChatInput.vue'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
}

const messages = ref<Message[]>([
  { id: 1, role: 'bot', text: 'Привет! Задай свой вопрос' }
])

const sendMessage = (text: string) => {
  messages.value.push({
    id: Date.now(),
    role: 'user',
    text
  })

  // fake bot response
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'bot',
      text: 'Я здесь, чтобы помочь'
    })
  }, 600)
}
</script>

<template>
  <div class="chat-page">
    <ChatWindow :messages="messages" />
    <ChatInput @send="sendMessage" />
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 128px); /* header */
}
</style>

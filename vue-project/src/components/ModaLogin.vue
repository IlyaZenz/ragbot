<script setup lang="ts">
import { ref, defineExpose, defineModel } from 'vue'

const visible = defineModel<boolean>('visible', { default: false })
const email = ref('')
const password = ref('')

const open = () => { visible.value = true }
const close = () => { visible.value = false }

const submitLogin = () => {
  console.log('Login:', email.value, password.value)
  setTimeout(() => {
    close()
  }, 300);
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog v-model="visible" width="400px" :close-on-click-modal="true" center :show-close="true"
    custom-class="rounded-2xl shadow-2xl">
    <template #header>
      <div class="text-center pt-4 pb-2 border-b border-gray-100 mr-8">
        <h2 class="text-3xl font-extrabold text-gray-800">
          Welcome Back
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          Enter your details below to log in.
        </p>
      </div>
    </template>

    <form class="flex flex-col gap-5 p-6" @submit.prevent="submitLogin">
      <el-input v-model="email" placeholder="Email Address" type="email" size="large" class="rounded-lg!" />
      <el-input v-model="password" placeholder="Password" type="password" size="large" show-password
        class="rounded-lg!" />

      <el-button type="primary"
        class="w-full mt-4 bg-blue-600! h-12! rounded-lg! text-lg! font-semibold! transition-all duration-200 hover:bg-blue-700!"
        native-type="submit" size="large">
        Log In
      </el-button>
    </form>

    <template #footer>
      <div class="text-center text-gray-500 pb-4 pt-2">
        Don't have an account?
        <router-link to="/registration" class="text-blue-600 hover:underline font-medium" @click="close">
          Sign Up Now
        </router-link>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
<script setup lang="ts">
import logo from '@/assets/logo.png'
import ModaLogin from '@/components/ModaLogin.vue'
import { ref } from 'vue'

const loginModalRef = ref<InstanceType<typeof ModaLogin> | null>(null)
const openLogin = () => loginModalRef.value?.open()

</script>

<template>
  <el-header class="flex justify-between items-center px-6 bg-blue-500 text-white shadow-md!">
    <router-link to="/" class="flex items-center gap-3">
      <img :src="logo" alt="EduSKU" width="36" />
      <span class="font-bold text-2xl tracking-wide">EduSKU</span>
    </router-link>
    <div class="flex gap-4">
      <el-button @click="openLogin" type="primary" class="bg-white! text-blue-600! !hover:bg-gray-200 border-none!">
        Log In
      </el-button>
      <router-link to="/registration">
        <el-button type="primary" size="medium" class="!hover:bg-yellow-500 border-none!">
          Sign Up
        </el-button>
      </router-link>
    </div>
  </el-header>
  <ModaLogin ref="loginModalRef" />
</template>

<style scoped>
.el-button {
  border-radius: 8px;
  font-weight: 500;
}
</style>
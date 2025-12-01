<script setup lang="ts">
import Header from '@/components/Header.vue' // путь к твоему Header.vue
</script>

<template>
  <Header />
  <el-container>
    <!-- ASIDE -->
    <el-aside v-if="!$route.meta.hideAside" width="200px">
      Aside
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-button {
  border-radius: 8px;
  font-weight: 500;
}
</style>
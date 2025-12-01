<script setup lang="ts">
import { ref, defineExpose, defineModel, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const visible = defineModel<boolean>('visible', { default: false })

const open = () => { visible.value = true }
const close = () => { visible.value = false }
defineExpose({ open, close })



const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  email: '',
  password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters long', trigger: 'blur' },
  ],
})

const submitLoginForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return


  const valid = await formEl.validate((valid, fields) => {
    if (valid) {

      console.log('Login attempt:', ruleForm.email, ruleForm.password)


      setTimeout(() => {
        close()
        formEl.resetFields()
      }, 300);

    } else {
      console.log('Validation failed!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-dialog v-model="visible" width="400px" :close-on-click-modal="true" center :show-close="true"
    custom-class="rounded-2xl shadow-2xl">
    <template #header>
      <div class="text-center pt-4! pb-4! border-b border-gray-100 mr-8">
        <h2 class="text-3xl font-extrabold text-gray-800">
          Welcome Back
        </h2>
        <p class="text-sm text-gray-500 mt-1!">
          Enter your details below to log in.
        </p>
      </div>
    </template>

    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class=" demo-ruleForm" @submit.prevent>
      <el-form-item prop="email" class="mb-7!">
        <el-input v-model="ruleForm.email" placeholder="Email Address" type="email" size="large" class="rounded-lg!" />
      </el-form-item>

      <el-form-item prop="password" class="mb-3!">
        <el-input v-model="ruleForm.password" placeholder="Password" type="password" size="large" show-password
          class="rounded-lg!" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitLoginForm(ruleFormRef)"
          class="w-full! mt-4! bg-blue-600! h-12! rounded-lg! text-lg! font-semibold! transition-all! duration-200! hover:bg-blue-700!"
          size="large">
          Log In
        </el-button>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="text-center! text-gray-500! pb-4!">
        Don't have an account?
        <router-link to="/registration" class="text-blue-600! hover:underline! font-medium!" @click="close">
          Sign Up Now
        </router-link>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
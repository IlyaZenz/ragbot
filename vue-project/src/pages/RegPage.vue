<template>
    <div class="registration-container flex justify-center items-center min-h-screen bg-gray-50">

        <el-card class="registration-card w-full max-w-md p-8 shadow-2xl rounded-xl">

            <div class="text-center mb-10">
                <h1 class="text-4xl font-extrabold text-blue-600">
                    Sign Up
                </h1>
                <p class="text-md text-gray-500 mt-2!">
                    Create your new EduSKU account.
                </p>
            </div>

            <el-form ref="registrationFormRef" :model="formData" class="demo-ruleForm" label-position="top"
                @submit.prevent :rules="formRules">
                <el-form-item label="Username" prop="username" class="mb-5!">
                    <el-input v-model="formData.username" placeholder="Username" type="text" size="large"
                        class="rounded-lg!" />
                </el-form-item>

                <el-form-item label="Email Address" prop="email" class="mb-5!">
                    <el-input v-model="formData.email" placeholder="Enter your email" type="email" size="large"
                        class="rounded-lg!" />
                </el-form-item>

                <el-form-item label="Password" prop="password" class="mb-5!">
                    <el-input v-model="formData.password" placeholder="Create a password" type="password" size="large"
                        show-password class="rounded-lg!" />
                </el-form-item>

                <el-form-item label="Confirm Password" prop="confirmPassword" class="mb-8!">
                    <el-input v-model="formData.confirmPassword" placeholder="Confirm your password" type="password"
                        size="large" show-password class="rounded-lg!" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitRegistrationForm(registrationFormRef)"
                        class="w-full! mt-2! bg-blue-600! h-12! rounded-lg! text-xl! font-bold! transition-all! duration-200! hover:bg-blue-700!"
                        size="large">
                        Sign Up
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="text-center! text-gray-500! mt-6!">
                Already have an account?
                <router-link to="/" class="text-blue-600! hover:underline! font-medium!">
                    Log In Now
                </router-link>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import axios from 'axios';
import router from '@/router';

const api = 'http://localhost:3000'

const registrationFormRef = ref<FormInstance>();
const isLoading = ref(false);



const formData = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
});

const validatePassConfirm = (rule: any, value: any, callback: any) => {
    if (value == "") {
        callback(new Error('Please confirm your password'))
    }
    else if (value != formData.password) {
        callback(new Error('Password dont match!'))
    }
    else {
        callback()
    }
}

const formRules = reactive<FormRules<typeof formData>>({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },
        { min: 3, message: 'Username must be at least 3 characters long', trigger: ['blur'] },
        {
            pattern: /^[a-zA-Z0-9]+$/, 
            message: 'Username can only contain Latin letters and numbers.',
            trigger: ['blur', 'change']
        }
    ],
    email: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] },
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 8, message: 'Password must be at least 8 characters long', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d).*$/, 
            message: 'Password must contain both letters and numbers.',
            trigger: ['blur', 'change']
        }
    ],
    confirmPassword: [
        { required: true, message: 'Please confirm your password', trigger: 'blur' },
        { validator: validatePassConfirm, trigger: 'blur' },
    ],
});

const submitRegistrationForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    const valid = await formEl.validate();
    if (!valid) {
        ElMessage.error('Please fix the errors in the form.');
        return;
    }

    isLoading.value = true;
    try {
        const response = await axios.post(`${api}/auth/registration`, {
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
        ElMessage.success('Registration successful! You can now log in.');
        if (registrationFormRef.value) {
            registrationFormRef.value.resetFields();
        }
        router.push('/');
    }
    catch (error: any) {
        let message = 'An unexpected error occurred.';
        ElMessage.error(message);
    }
    finally {
        isLoading.value = false
    }
}

</script>

<style scoped>
.registration-container {
    padding-top: 5vh;
    padding-bottom: 5vh;
}
</style>
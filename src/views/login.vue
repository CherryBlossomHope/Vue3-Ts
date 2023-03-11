<script setup lang="ts">
import { ref, reactive, toRaw, getCurrentInstance } from 'vue';
import type { FormRules, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/stores/counter'
import { getUserInfo } from '@/api/request'
import processLST from '@/utils/processLST'
// 使用app.config.globalProperties全局方法
const { proxy }: any = getCurrentInstance();

const router = useRouter()
// 引入store
const store = useUserInfoStore()
//登录图标加载
let LoadingBtn = ref(false)
//表单Ref
const loginRef = ref<FormInstance>()
//用户数据
const userLogin = reactive({
    userName: '',
    passWord: '',
    verificationCode: '',
})
//表单验证
const rules = reactive<FormRules>({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'change' },
    ],
    passWord: [
        { required: true, message: '请输入密码', trigger: 'change' },
    ],
    verificationCode: [
        { required: true, message: '请输入验证码', trigger: 'change' },
    ],
})
//登录按钮
const getForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            getUserInfo(toRaw(userLogin)).then(res => {
                LoadingBtn.value = true
                console.log(res);
                if (res.data.token) {
                    store.$patch({
                        token: res.data.token,
                        userName: res.data.userName
                    })
                    processLST.set('USER_INFO', res.data)
                    proxy.$successMsg(res.msg)
                    setTimeout(() => {
                        router.replace("/")
                    }, 1000);
                } else {
                    proxy.$errMsg(res.msg)
                    LoadingBtn.value = false
                }
            })
        }
    })
}
</script>

<template>
    <div class="loginBox">
        <el-form ref="loginRef" label-position="right" label-width="100px" :model="userLogin" :rules="rules">
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="userLogin.userName" />
            </el-form-item>
            <el-form-item label="密码:" prop="passWord">
                <el-input v-model="userLogin.passWord" show-password />
            </el-form-item>
            <el-form-item label="验证码:" prop="verificationCode">
                <el-input v-model="userLogin.verificationCode" />
            </el-form-item>
        </el-form>
        <el-button type="primary" :loading="LoadingBtn" class="loginBtn" @click="getForm(loginRef)">登录</el-button>
        <el-button type="info" class="loginBtn">注册</el-button>
    </div>
</template>

<style lang="less" scoped>
.loginBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20%;
    text-align: center;
}

.loginBtn {
    margin-top: 20px;
    width: 60%;
    margin-left: 0;
}
</style>
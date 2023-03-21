<script setup lang="ts">
import { ref, reactive, toRaw, getCurrentInstance } from 'vue';
import type { FormRules, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/stores/counter'
import { userLoginApi, userRegisterApi } from '@/api/user'
import storageClass from '@/utils/storageClass'
import { useKeyboardEvents } from '@/hooks/keyboardEvents'
// 使用app.config.globalProperties全局方法
const { proxy }: any = getCurrentInstance();

const router = useRouter()
// 引入store
const store = useUserInfoStore()

//登录图标加载
let LoadingBtn = ref(false)
//表单Ref
const loginRef = ref<FormInstance>()
const registerRef = ref<FormInstance>()
//用户数据
const userLogin = reactive({
    userName: '',
    passWord: '',
    verificationCode: '',
})
const userRegister = reactive({
    userName: '',
    passWord: '',
    passWord2: ''
})
//表单验证
const loginRules = reactive<FormRules>({
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
const registerRules = reactive<FormRules>({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'change' },
    ],
    passWord: [
        { required: true, message: '请输入密码', trigger: 'change' },
    ],
})
//登录按钮
const getForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            userLoginApi(toRaw(userLogin)).then(res => {
                LoadingBtn.value = true
                console.log(res);
                if (res.token) {
                    store.$patch({
                        token: res.token,
                        userName: res.data.userName,
                        permission: res.data.permission
                    })
                    storageClass.set('USER_INFO', res.token)
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
// 回车触发登录
useKeyboardEvents(() => {
    getForm(loginRef.value)
}, 'Enter')

// 完成注册返回登录
const finshRegister = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {

        }
    })

}

// 登录 <--> 注册
const styleSwitching = ref()
const changeLogin = ref(true)
const changeRegister = ref(false)
/**
 * @param {Boolean} val 注册->登录(ture) 登录->注册(false)
 */
const toggleLoR = (val: boolean) => {
    if (val) {
        changeRegister.value = false
        setTimeout(() => {
            styleSwitching.value = 'change'
            setTimeout(() => {
                styleSwitching.value = 'change2'
                changeLogin.value = true
            }, 1000);
        }, 1000);
    } else {
        changeLogin.value = false
        setTimeout(() => {
            styleSwitching.value = 'change'
            setTimeout(() => {
                styleSwitching.value = 'change2'
                changeRegister.value = true
            }, 1000);
        }, 1000);
    }
}
</script>

<template>
    <div class="box" ref="userInput">
        <div class="loginBox" :class="styleSwitching">
            <!-- 登录 -->
            <Transition>
                <div v-show="changeLogin">
                    <el-form ref="loginRef" label-width="70px" :model="userLogin" :rules="loginRules">
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
                    <div class="disflex">
                        <el-button type="info" class="loginBtn" @click="toggleLoR(false)">注册</el-button>
                        <el-button type="primary" :loading="LoadingBtn" class="loginBtn" @keyup="useKeyboardEvents"
                            @click="getForm(loginRef)">登录</el-button>
                    </div>
                </div>
            </Transition>

            <!-- 注册 -->
            <Transition>
                <div v-show="changeRegister">
                    <el-form ref="registerRef" label-width="70px" :model="userRegister" :rules="registerRules">
                        <el-form-item label="用户名:" prop="userName">
                            <el-input v-model="userRegister.userName" />
                        </el-form-item>
                        <el-form-item label="密码:" prop="passWord">
                            <el-input v-model="userRegister.passWord" show-password />
                        </el-form-item>
                        <el-form-item label="密码*2:" prop="passWord2">
                            <el-input v-model="userRegister.passWord2" />
                        </el-form-item>
                    </el-form>
                    <div class="disflex">
                        <el-button type="primary" class="loginBtn" @click="finshRegister(registerRef)">注册</el-button>
                        <el-button type="info" class="loginBtn" @click="toggleLoR(true)">返回</el-button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style lang="less" scoped>
.change {
    transform: translate(-50%, -50%) rotateY(180deg) !important;
    transition: all .5s;
}

.change2 {
    transform: translate(-50%, -50%) rotateY(360deg) !important;
    transition: all 1s;
}

.disflex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box {
    width: 100%;
    height: 100vh;
    background: url('@/assets/image/login_bgImg1.png') no-repeat;
    background-size: 100% 100%;
}

.loginBox {
    padding: 55px 40px;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18%;
    text-align: center;
    transition: all 1s linear;
}

.loginBtn {
    margin-top: 20px;
    width: 48%;
    margin-left: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
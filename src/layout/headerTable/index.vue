<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { useUserInfoStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import storageClass from '@/utils/storageClass'

const { proxy }: any = getCurrentInstance();
const router = useRouter();
const store = useUserInfoStore()
// 退出登录
const LogOut = () => {
    storageClass.clear()
    store.$reset()
    proxy.$successMsg('已退出登录')
    setTimeout(() => {
        router.replace('/login')
    }, 1000);
}
</script>

<template>
    <div class="toolbar_header">
        <div class="logo_box">
            <p class="logo_title">后台管理系统</p>
        </div>
        <div class="disflex">
            <el-avatar :size="35"
                src='https://n.sinaimg.cn/sinakd20211205ac/241/w932h909/20211205/43b1-5db900e6b81fa51d88fd16ff003cb134.jpg' />
            <span class="user_Permiss">{{ store.userPermiss }}</span>
            <el-dropdown>
                <el-icon style="margin-right: 8px; margin-top: 1px">
                    <setting />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="less" scoped>
.disflex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user_Permiss {
    display: inline-block;
    margin: 0 10px;
}

.toolbar_header {
    height: 100%;
    .disflex
}

.logo_title {
    font-size: 20px;
    font-weight: 600;
}
</style>
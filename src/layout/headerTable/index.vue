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
    <div class="toolbar">
        <div class="block">
            <el-avatar :size="35"
                src='https://n.sinaimg.cn/sinakd20211205ac/241/w932h909/20211205/43b1-5db900e6b81fa51d88fd16ff003cb134.jpg' />
        </div>
        <span class="user_Permiss">{{ store.userPermiss }}</span>
        <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>View</el-dropdown-item>
                    <el-dropdown-item>Add</el-dropdown-item>
                    <el-dropdown-item>Delete</el-dropdown-item>
                    <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style lang="less" scoped>
.user_Permiss {
    display: inline-block;
    margin: 0 10px;
}
</style>
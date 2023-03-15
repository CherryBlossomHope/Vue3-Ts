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
        <span>{{ store.userPermiss }}</span>
    </div>
</template>

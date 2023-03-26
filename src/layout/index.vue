<script lang="ts" setup>
import { reactive } from 'vue';
import type { menuType } from '@/types/layoutMenuType'
import { getMenuList } from '@/api/menu'
import headerTable from './headerTable/index.vue'
import leftTable from './leftTable/index.vue'

//获取菜单列表
const menuTree = reactive<Array<menuType>>([])
getMenuList().then(res => {
    res.data.sort((a: any, b: any) => {
        return a.indexCode - b.indexCode
    })
    menuTree.push(...res.data)
})
</script>

<template>
    <el-container class="layout-container-demo" style="height: 100vh">
        <el-header style="font-size: 12px">
            <headerTable />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu>
                        <leftTable :menuTree="menuTree" />
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-main class="main_box">
                <el-scrollbar>
                    <RouterView></RouterView>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.main_box {
    padding: 15px !important;
}
</style>

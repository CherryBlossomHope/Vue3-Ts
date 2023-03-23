<script lang="ts" setup>
import type { menuType } from '@/types/layoutMenuType'
import headerTable from './headerTable/index.vue'
import leftTable from './leftTable/index.vue'

//菜单列表
const menuTree: Array<menuType> = [
    {
        title: '首页',
        indexCode: '1',
        path: '/index',
        icon: 'HomeFilled',
    },
    {
        title: '新闻',
        indexCode: '2',
        path: '',
        icon: 'Menu',
        children: [
            {
                title: '新闻管理',
                indexCode: '2-1',
                path: '/news',
                icon: 'HomeFilled',
            }
        ]
    }
];
</script>

<template>
    <el-container class="layout-container-demo" style="height: 100vh">
        <el-header style="text-align: right; font-size: 12px">
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
            <el-main>
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
</style>

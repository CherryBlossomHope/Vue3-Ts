<script lang="ts" setup>
import type { menuType } from '@/types/layoutLeftTable'
import headerTable from './headerTable/index.vue'
import leftTable from './leftTable/index.vue'

//菜单列表
const menuTree: Array<menuType> = [
    {
        title: '菜单一',
        indexNum: '1',
        icon: 'Menu',
        children: [
            {
                title: '首页',
                indexNum: '1-1',
                path: '/',
                icon: 'HomeFilled',
            },
            {
                title: '新闻',
                indexNum: '1-2',
                path: 'newsManage',
                icon: 'Comment',
                children: [
                    {
                        title: '新闻1',
                        indexNum: '1-2-1',
                        icon: 'Comment',
                        path: '',
                    }
                ]
            },
        ],
    },
    {
        title: '菜单二',
        indexNum: '2',
        icon: 'Menu',
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
                    <leftTable :menuTree="menuTree" />
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

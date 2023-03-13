<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1']" v-for="(item, index) in tabLists" :key="index">
          <el-sub-menu :index="item.indexNum">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              {{ item.title }}
            </template>
            <el-menu-item-group>
              <el-menu-item :index="items.indexNum" v-for="(items, index) in item.children" :key="index"
                @click="tabListRoter(items.path)"
                :style="items.title == route.meta.title ? 'color:var(--el-menu-active-color)' : ''">
                <el-icon>
                  <component :is="items.icon" />
                </el-icon>
                {{ items.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
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
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ userPermission[store.permission] }}</span>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <RouterView></RouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserInfoStore } from '@/stores/counter';
import { userPermission } from '@/enum'
const store = useUserInfoStore()
const router = useRouter();
const route = useRoute()

// 菜单路由跳转
const tabListRoter = (path: string) => {
  router.push(`/${path}`);
};

//菜单列表
const tabLists = [
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
      },
    ],
  },
];
</script>

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

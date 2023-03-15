<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
export interface menuType {
    title: string,
    indexCode: string,
    icon?: string,
    path?: string,
    children?: Array<menuType>
}
const router = useRouter();
const route = useRoute()
// 菜单路由跳转
const tabListRoter = (path: string | undefined) => {
    router.push(`${path}`);
};
defineProps<{
    menuTree: Array<menuType>
}>()

</script>

<template>
    <template v-for="(item, index) in menuTree">
        <!--有children情况-->
        <template v-if="item.children">
            <el-sub-menu :key="item.indexCode + '_' + index" :index="item.indexCode">
                <template #title>
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.title }}</span>
                </template>
                <!--递归子菜单-->
                <index :menuTree="item.children" />
            </el-sub-menu>
        </template>
        <!--无children情况-->
        <el-menu-item v-else :index="item.indexCode" :class="route.path == item.path ? 'is-active' : ''"
            @click="tabListRoter(item.path)">
            <template #title>
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

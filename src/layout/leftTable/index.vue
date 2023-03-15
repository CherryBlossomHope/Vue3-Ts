<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
export interface menuType {
    title: string,
    indexNum: string,
    icon?: string,
    path?: string,
    children?: Array<menuType>
}
const router = useRouter();
const route = useRoute()
// 菜单路由跳转
const tabListRoter = (path: string) => {
    router.push(`${path}`);
};
defineProps<{
    menuTree: Array<menuType>
}>()

</script>

<template></template>

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { userLoginApi } from '@/api/user'
import storageClass from '@/utils/storageClass'
import loginPage from '@/views/login.vue'
import layout from '@/layout/index.vue'

//meta类型定义
declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/index',
    children: []
  },
  {
    path: '/login',
    name: "login",
    component: loginPage,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes
})

//判断登录状态 是否进入登录页面
router.beforeEach(async (to, from, next) => {
  console.log("😛 ~ file: index.ts:41 ~ router.beforeEach ~ to", to)
  console.log("🥰 ~ file: index.ts:41 ~ router.beforeEach ~ from", from)
  document.title = to.meta.title
  if (!storageClass.get('USER_INFO').value && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
export default router

import { createRouter, createWebHistory } from 'vue-router'
import loginPage from '@/views/login.vue'

//meta类型定义
declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: "login",
      component: loginPage,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/index',
      name: "index",
      component: () => import('@/views/index.vue'),
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'newsManage',
          component: () => import("@/views/newsManage/index.vue"),
          meta: {
            title: '新闻管理'
          },
        },
      ],
    }
  ]
})

//判断登录状态 是否进入登录页面
router.beforeEach((to, from, next) => {
  console.log("😛 ~ file: index.ts:41 ~ router.beforeEach ~ to", to)
  console.log("🥰 ~ file: index.ts:41 ~ router.beforeEach ~ from", from)
  document.title = to.meta.title
  if (to.path == "/" && from.path == "/") {
    if (localStorage.getItem("token") == null) {
      next("/login")
    }
  } else {
    next()
  }
})
export default router

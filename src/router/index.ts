import { createRouter, createWebHistory } from 'vue-router'
import { getUserInfo } from '@/api/request'
import { ElMessage } from 'element-plus';
import storageClass from '@/utils/storageClass'
import loginPage from '@/views/login.vue'
import layout from '@/layout/index.vue'


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
      path: '/',
      component: layout,
      children: [
        {
          path: '',
          component: () => import('@/views/index/index.vue'),
          meta: {
            title: '首页'
          },
        },
        {
          path: 'news',
          component: () => import("@/views/news/index.vue"),
          meta: {
            title: '新闻'
          },
        },
      ]
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
      component: () => import('@/views/404.vue')
    }
  ]
})

//判断登录状态 是否进入登录页面
router.beforeEach((to, from, next) => {
  console.log("😛 ~ file: index.ts:41 ~ router.beforeEach ~ to", to)
  console.log("🥰 ~ file: index.ts:41 ~ router.beforeEach ~ from", from)
  document.title = to.meta.title
  if (to.path == '/') {
    if (storageClass.get('USER_INFO').value) {
      // getUserInfo({}).then(res => {
      //   // ElMessage({
      //   //   message: res.msg,
      //   //   type: 'success',
      //   // })
      //   // next()
      // })
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router

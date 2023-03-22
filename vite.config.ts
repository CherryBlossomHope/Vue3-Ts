import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'


export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [vue()],
    server: {
      port: 3001,
      https: false, // 是否开启 https
      open: true, // 是否自动在浏览器打开
      hmr: true, //开启热更新
      host: "0.0.0.0", //NetWork
      proxy: {
        [env.VITE_BASE_API]: { // “/api” 以及前置字符串会被替换为真正域名
          target: env.VITE_BASE_URL, // 请求域名
          changeOrigin: true, // 是否跨域
          rewrite: (path) => path.replace(env.VITE_BASE_API, '') //去除接口地址中的 /api
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  })
}

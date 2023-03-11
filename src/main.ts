import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

//引入Element图表库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

//引入Element图表库  entries报错解决方法：在tsconfig中写入"lib": ["es2017", "dom"]配置
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 挂载全局方法
app.config.globalProperties.$successMsg = (message: string) => {
    ElMessage({
        message: message,
        type: 'success',
    })
}
app.config.globalProperties.$errMsg = (message: string) => {
    ElMessage.error(message)
}

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')

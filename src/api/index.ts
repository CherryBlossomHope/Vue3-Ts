import axios from 'axios';
import { ElMessage } from 'element-plus';
import storageClass from '@/utils/storageClass'


// 处理  类型“AxiosResponse<any, any>”上不存在属性
declare module "axios" {
    interface AxiosResponse<T = any> {
        msg?: string
        code?: number
        token?: string
        // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// 创建axios实例
const request = axios.create({
    // 请求的域名，基本地址，proxy 代理时会将“/api”以及前置字符串会被替换为真正域名
    baseURL: import.meta.env.VITE_BASE_API,
    // 跨域请求时发送Cookie
    withCredentials: true, // 视情况而定
    // 超时时间
    timeout: 5000,
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
});

// 请求拦截器
request.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    if (storageClass.get('USER_INFO').value) {
        config.headers.token = storageClass.get('USER_INFO').value || "";
    }
    return config;
});

// 响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    ResponseProcessing(error);
});

/**
 * 响应处理
 * @param error 
 * @returns 
 */
const ResponseProcessing = (error: any) => {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                ElMessage.warning("请求失败！请您稍后重试");
                break;
            case 401:
                ElMessage.warning("登录失效！请您重新登录");
                break;
            case 403:
                ElMessage.warning("当前账号无权限访问！");
                break;
            case 404:
                ElMessage.warning("你所访问的资源不存在！");
                break;
            case 405:
                ElMessage.warning("请求方式错误！请您稍后重试");
                break;
            case 408:
                ElMessage.warning("请求超时！请您稍后重试");
                break;
            case 500:
                ElMessage.warning("服务异常！");
                break;
            case 502:
                ElMessage.warning("网关错误！");
                break;
            case 503:
                ElMessage.warning("服务不可用！");
                break;
            case 504:
                ElMessage.warning("网关超时！");
                break;
            default:
                return Promise.reject(error.response.data); // 返回接口返回的错误信息
        }
    } else {
        ElMessage.error("遇到跨域错误，请设置代理或者修改后端允许跨域访问！");
    }
};

export default request;

import axios from 'axios';
import { ElMessage } from 'element-plus';
import storageClass from '@/utils/storageClass'


// 处理  类型“AxiosResponse<any, any>”上不存在属性
declare module "axios" {
    interface AxiosResponse<T = any> {
        msg: any;
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
    if (storageClass.get('USER_INFO')) {
        config.headers.token = storageClass.get('USER_INFO').value.token || "";
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
            case 401:
                ElMessage.warning("资源没有访问权限！");
                break;
            case 404:
                ElMessage.warning("接口不存在，请检查接口地址是否正确！");
                break;
            case 500:
                ElMessage.warning("内部服务器错误，请联系系统管理员！");
                break;
            default:
                return Promise.reject(error.response.data); // 返回接口返回的错误信息
        }
    } else {
        ElMessage.error("遇到跨域错误，请设置代理或者修改后端允许跨域访问！");
    }
};

export default request;

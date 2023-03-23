import request from '@/utils/request';
import type { userInfoType } from '@/types/login'

// 用户登录
export function userLoginApi(data: userInfoType) {
    return request({
        url: "/user/login",
        method: "post",
        data: data
    })
}

// 用户注册
export function userRegisterApi(data: userInfoType) {
    return request({
        url: "/user/register",
        method: "post",
        data: data
    })
}
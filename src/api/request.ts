import request from './index';
import type { userInfoType } from '@/types/login'

export function getUserInfo(data: userInfoType) {
    return request({
        url: "/login",
        method: "post",
        data: data
    })
}
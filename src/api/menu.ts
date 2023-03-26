import request from '@/utils/request';

export function getMenuList() {
    return request({
        url: "menu/getMenuList",
        method: "get",
    })
}
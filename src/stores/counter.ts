import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  // 开启数据持久化
  persist: true,
  state() {
    return {
      token: '',
      userName: '',
      permission: NaN
    }
  }
})

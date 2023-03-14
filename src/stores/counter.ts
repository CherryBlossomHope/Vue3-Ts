import { defineStore } from 'pinia'
import { userPermission } from '@/enum/index'

export const useUserInfoStore = defineStore('userInfo', {
  // 开启数据持久化
  persist: true,
  state() {
    return {
      token: '',
      userName: '',
      permission: NaN
    }
  },
  getters: {
    userPermiss: (state) => userPermission[state.permission]
  }
})

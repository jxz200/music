import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IUserInfo } from '../types/users';

// 使用setup模式定义
export const useUserStore = defineStore(
  'userStore',
  () => {
    const userInfo = ref<IUserInfo>({} as IUserInfo);
    const setUserInfo = (info: IUserInfo) => {
      userInfo.value = info;
    };
    return { userInfo, setUserInfo };
  },
  {
    persist: {
      enabled: true,
    },
  }
);

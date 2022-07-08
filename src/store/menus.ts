import { defineStore } from 'pinia';
import { IRightsInfo } from '../types/roles';
import { getMenus } from '../http/api';
import { getRolesList } from '../http/api';
import { useUserStore } from './user';
import { IUserInfo } from '../types/users';

export const useMenusStore = defineStore(
  'userStore',
  () => {
    // state
    const rightsInfo = ref<IRightsInfo[]>([]);
    const setRightsInfo = (info: IRightsInfo[]) => {
      rightsInfo.value = info;
    };
    // actions
    const updateMenus = async (userInfo: IUserInfo) => {
      const { data: rolesData } = await getRolesList();
      setRightsInfo(rolesData.data.find((item: any) => item.id === userInfo.rid).children);
    };
    return { rightsInfo, setRightsInfo, updateMenus };
  },
  {
    // options 持久化
    persist: {
      enabled: true,
    },
  }
);

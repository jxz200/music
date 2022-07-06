import { defineStore } from 'pinia';
import { IRightsInfo } from '../types/roles';
import { getMenus } from '../http/api';

export const useMenusStore = defineStore(
  'userStore',
  () => {
    // state
    const rightsInfo = ref<IRightsInfo[]>([]);
    const setRightsInfo = (info: IRightsInfo[]) => {
      rightsInfo.value = info;
    };
    // actions
    const updateMenus = async () => {
      const { data } = await getMenus();
      setRightsInfo(data.data);
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

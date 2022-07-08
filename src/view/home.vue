<template>
  <div class="h-screen w-screen grid grid-rows-[60px,1fr]">
    <header class="flex justify-between items-center px-4 border-b-2 border-gray-100">
      <div class="flex items-center relative">
        <svg viewBox="0 0 248 31" class="text-slate-900 dark:text-white w-auto h-6">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
            fill="#38bdf8"
          ></path>
        </svg>
        <h1 class="tracking-wider font-semibold absolute left-12">后台管理系统</h1>
      </div>

      <XButton class="bg-gray-400 hover:bg-gray-600" @click="logout">退出</XButton>
    </header>
    <div class="w-screen grid grid-cols-[180px_1fr]">
      <aside>
        <el-menu class="h-full overflow-hidden" :default-openeds="[0, 1]" :default-active="`0-0`">
          <el-sub-menu class="w-full" :index="index" v-for="(item, index) in menusList">
            <template #title>
              <i :class="`iconfont icon-${iconMap.get(item.id)} text-2xl text-blue-400 mr-2`"></i>
              <span class="font-medium">{{ item.authName }}</span>
            </template>
            <el-menu-item
              class="w-full"
              v-for="(subItem, subIndex) in item.children"
              :index="`${index}-${subIndex}`"
              @click="router.push(`/home/${subItem.path}`)"
            >
              <!-- <i :class="`iconfont icon-shuanglieliebiao text-2xl text-blue-400 mr-2`"></i> -->
              {{ subItem.authName }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </aside>
      <main class="pt-4 pl-4 pr-4">
        <el-breadcrumb :separator-icon="ArrowRight" class="mb-4">
          <el-breadcrumb-item v-for="item in route.matched" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
          <router-view></router-view>
        </el-card>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getMenus } from '../http/api';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import XButton from '../components/XButton.vue';
// import

const router = useRouter();

const route = useRoute();

interface IMenu {
  authName: string;
  id: number;
  order: number;
  path: string;
  children?: IMenu[];
}
const menusList = ref<IMenu[]>([]);
// 获取菜单列表
getMenus().then((res) => {
  menusList.value = res.data.data;
});
//  退出登录
const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.clear();
  router.push('/login');
  ElMessage.success('退出成功');
};
// 图标关系的映射表
const iconMap = new Map([
  [125, 'yonghu'],
  [103, 'quanxianyuechi'],
  [101, 'shangpin'],
  [102, 'dingdan1'],
  [145, 'shujutongji'],
]);
</script>

<style scoped></style>

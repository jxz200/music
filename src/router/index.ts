import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { Component, nextTick } from 'vue';
import { useMenusStore } from '../store/menus';
import { routes, routesMap } from './route';
import { IRightsInfo } from '../types/roles';

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'login') return next();
  if (!localStorage.getItem('token')) next('/login');
  const { rightsInfo } = useMenusStore();
  next();
});

// 生成动态路由
export function initDanamicRoutes() {
  const { rightsInfo } = useMenusStore();
  console.log('rightsInfo', rightsInfo);

  for (const item of rightsInfo) {
    for (const subItem of item.children as IRightsInfo[]) {
      const curRoute = routesMap.get(subItem.path); // 获取用户权限对应的路由规则
      console.log(curRoute);

      router.addRoute('home', curRoute as RouteRecordRaw); // 向home组件中动态加入路由
    }
  }
  console.log(routes);
  console.log(router);
}
export default router;
